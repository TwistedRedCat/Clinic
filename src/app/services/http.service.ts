import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blog } from "../shared/blog.model";
import { map, tap, catchError } from "rxjs/operators";
import { Subject, throwError, BehaviorSubject, Subscription } from "rxjs";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

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
  urlPathReverse: string[];
  userActive = new Subject<boolean>();
  userActiveBool: boolean;
  user = new BehaviorSubject<User>(null);
  authSignIn = new Subject<boolean>();
  isLoading = new Subject<boolean>();
  errorMsg = new Subject<string>();
  logOutTimer: any;

  get activatedUser() {
    return this.userActiveBool;
  }

  constructor(private http: HttpClient, private router: Router) {}

  httpFetchBlogs() {
    return this.http
      .get<any>("https://husin-web.firebaseio.com//posts.json")
      .pipe(
        tap(fetchedBlogs => {
          this.urlPath = [];
          for (const key in fetchedBlogs) {
            if (fetchedBlogs.hasOwnProperty(key)) {
              this.urlPath.push(key);
            }
          }
          this.urlPathReverse = this.urlPath.reverse();
        }),
        map(data => {
          return Object.keys(data)
            .map(z => {
              return data[z];
            })
            .reverse();
        })
      );
  }

  httpUpdateBlog(i: number, blog: Blog) {
    return this.http.patch(
      "https://husin-web.firebaseio.com/posts/" + this.urlPath[i] + ".json",
      blog
    );
  }

  httpAddBlog(blog: Blog) {
    return this.http.post("https://husin-web.firebaseio.com/posts.json", blog);
  }

  httpDeleteBlog(i: number) {
    console.log(this.urlPathReverse);
    console.log(this.urlPathReverse[i]);
    return this.http.delete<null>(
      "https://husin-web.firebaseio.com/posts/" +
        this.urlPathReverse[i] +
        ".json"
    );
  }

  httpSignUP(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.fireBaseKey,
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.fireBaseKey,
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
          console.log(resData);
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

    this.userActive.next(true);
    this.userActiveBool = true;

    if (newUser.token) {
      const timeLeft =
        new Date(userLS._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(newUser);
      this.autoLogOut(timeLeft);
    }
  }

  logOut() {
    this.userActive.next(false);
    this.user.next(null);
    this.router.navigate(["/"]);
    localStorage.removeItem("userData");
    if (this.logOutTimer) {
      clearTimeout(this.logOutTimer);
    }
    this.logOutTimer = null;
    this.isLoading.next(true);
    const x = setTimeout(time => {
      this.isLoading.next(false);
    }, 1000);
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
    this.userActive.next(true);
    localStorage.setItem("userData", JSON.stringify(user));
    this.user.next(user);
    this.autoLogOut(tokenExp * 1000);
  }
}
