import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Blog } from "../shared/blog.model";
import { BlogsServices } from "./blogs.service";
import { map, tap, catchError } from "rxjs/operators";
import { Subject, throwError, BehaviorSubject } from "rxjs";
import { EmailValidator } from "@angular/forms";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registerd?: boolean;
}

@Injectable({ providedIn: "root" })
export class HttpService {
  urlPath: string[];
  userActive: User;
  user = new BehaviorSubject<User>(null);
  logOutTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  httpFetchBlogs() {
    return this.http
      .get<Blog[]>("https://testing6187.firebaseio.com/posts.json")
      .pipe(
        tap(fetchedBlogs => {
          this.urlPath = [];
          for (const key in fetchedBlogs) {
            if (fetchedBlogs.hasOwnProperty(key)) {
              this.urlPath.push(key);
            }
          }
        })
      );
  }

  httpUpdateBlog(i: number, blog: Blog) {
    return this.http.patch(
      "https://testing6187.firebaseio.com/posts/" + this.urlPath[i] + ".json",
      blog
    );
  }

  httpAddBlog(blog: Blog) {
    return this.http.post(
      "https://testing6187.firebaseio.com/posts.json",
      blog
    );
  }

  httpDeleteBlog(i: number) {
    return this.http.delete<null>(
      "https://testing6187.firebaseio.com/posts/" + this.urlPath[i] + ".json"
    );
  }

  httpSignUP(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASPbT5oH16kEPKeKbtjdCbs1ijl1tMTcQ",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errRes => {
          let errorMsg = "Error occured!";
          if (!errRes.error || !errRes.error.error) {
            return throwError(errorMsg);
          }
          switch (errRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMsg = "This email already exist";
              return throwError(errorMsg);
            case "OPERATION_NOT_ALLOWED":
              errorMsg = "You are not authorized";
              return throwError(errorMsg);
          }
        }),
        tap(resData => {
          this.handleUser(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  httpSignIn(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASPbT5oH16kEPKeKbtjdCbs1ijl1tMTcQ",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errRes => {
          let errorMsg = "Error occured!";
          if (!errRes.error || !errRes.error.error) {
            return throwError(errorMsg);
          }
          switch (errRes.error.error.message) {
            case "EMAIL_NOT_FOUND":
              errorMsg = "Couldn't find email";
              break;
            case "INVALID_PASSWORD":
              errorMsg = "Wrong Password!";
              break;
          }
          return throwError(errorMsg);
        }),
        tap(resData => {
          this.handleUser(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userLS: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userLS) {
      return;
    }

    const newUser = new User(
      userLS.email,
      userLS.id,
      userLS._token,
      new Date(userLS._tokenExpirationDate)
    );
    if (newUser.token) {
      const timeLeft =
        new Date(userLS._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(newUser);
      this.autoLogOut(timeLeft);
    }
  }

  logOut() {
    this.userActive = null;
    this.user.next(null);
    this.router.navigate(["/"]);
    localStorage.removeItem("userData");
    if (this.logOutTimer) {
      clearTimeout(this.logOutTimer);
    }
    this.logOutTimer = null;
  }

  autoLogOut(timer: number) {
    this.logOutTimer = setTimeout(() => {
      this.logOut();
    }, timer);
  }

  private handleUser(
    email: string,
    userId: string,
    userToken: string,
    tokenExp: number
  ) {
    const expirationDate = new Date(new Date().getTime() + tokenExp * 1000);
    const user = new User(email, userId, userToken, expirationDate);
    console.log(expirationDate);
    this.userActive = user;
    localStorage.setItem("userData", JSON.stringify(this.userActive));
    this.user.next(user);
    this.autoLogOut(tokenExp * 1000);
  }
}
