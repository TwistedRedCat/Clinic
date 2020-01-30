import { Injectable } from "@angular/core";
import { GarageItem } from "../shared/GarageItem.model";

@Injectable({ providedIn: "root" })
export class GarageServices {
  items: GarageItem[] = [
    new GarageItem(
      "Computer",
      10,
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBIREhUQFRAVFRAQFhUWFRUQFRYWFhUVFRYYHiggGBolGxUVITEhJSsrMC4uFx8zODMtNygtLisBCgoKDg0OFxAQFysgHR0tMC0tKy0vMCsrLSsrLzIrKy0tKzArLSstLS0tKysrNi0tKy0rLS0rLTItLS0rLzc3K//AABEIALoBDwMBIgACEQEDEQH/xAAcAAEBAAMBAQEBAAAAAAAAAAAABAMFBgcCAQj/xABGEAACAgEBBAYFCQcDAQkBAAABAgADEQQFEiExBhNBUXGBByJhkaEyQlJygpKxwdEjM0NiosLwFFOyJBZEg5Oj0uHi8RX/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAgEDBAUG/8QAKBEBAQACAQMDAwQDAAAAAAAAAAECEQMEMVESFCETQWFCgaHwBSIy/9oADAMBAAIRAxEAPwD3GIiAiIgIiICIiAiIgIiICIiAieVdPen2oo1b6fTMEWndBbCnesIyc57ByxNDV6TdojnZWfFE/Sboe5xPFa/SnrxzWlvFf0Mpr9LOr+dRQfv/APuj0j2GJ5RX6Wrfnaas+DEfrKa/S0PnaU+Vn/1j0029OiedV+ljTn5WntHt3lP44lNfpU0J5pcPAIf7o1TbvInHVeknQN/vjxr/AEMpTp/s487WHjW/5CNUdRE56vpts08tSvmrj8VlKdKtAeWqp82A/GZobiJrq9u6NuWp05/8RP1lNevpb5NtZ8HU/nAoifisDyIPhP2AiIgIiICIiAiIgIiICIiAiIgIiICfhM/Zq+lGs6jRaq3luVWEfW3SF+JED+e+ket6622z/fvvs8hgJ/zb3TWpjuE+dY/rIv0UUebZs/Bx7p+I0+v0+OuOPFzX/aqkrXuHumZaEPZ7ifyMnraUoZ39GN+0c/Vl5ZV0ifzfeP6zINnofnOPAj8xPytpTW0z6PHf0xn1M/LEuyh2WP57v6T7/wD457LR9pM/3CVIZTW0e24r+k+tyeUNeyrhysrPirD+4zKNDqezqT4s4/tM2KNM6GPZ8V+38nuM2sXTakfw0P1bP1AmQJeOenY+0NSfxYGbZDMqGZ7Hj83+/se6z/DUKT87TWfcVv8AiTP3fp+dRYPaaLPxCzdqZlBmXoMftlW+7y8NGj6PPHKePWJ+kq0Gcai6rUuoqDNU1VrkLujOHB4HwOfjNpmavWNnT6gDnqLFqH2mFX9s8vUdNOKS73t34ee8l1p63sfVNdp6LWGGsrrdh3Mygke8yyY9NUEREHJVVfcMTJPnPUREQEREBERAREQEREBERAREQE4r0u6s17MdBzvsqrHv3z/wnazyz0267dOiq7FN1zD2Io3f75sHj+qszZZ3bxA+qvqr8AJ+1mR1mUI0+1hNYyPDl82rK2lNbSJGlFbTpHNdW0oRpFW0praUmra2lCNIq2lKNLiVqNM6GR1tKEMqIVoZmUyVDM6GUxSpmVTJ1MyqZsYyswAJPIAk+Amv2VWbL9m0n59wsYeytSxP3pm2m+KbP5hu/fIX85V0Hp6zaqns02nY/asIA/Az5n+Ry+ZHt6PH4teqxET5L3EREBERAREQEREBERAREQEREBPB/TRr9/XWoP4FNVfm5DH+l2nvE/l7p/r+u1mrfOd/U2Y+pVlB8GHunTim85E5XUrn0Mzo0kQzOhn2I8dWIZRW0iRpQjSkVbW0pRpFW0oraVErq2lFbSKtpRW0qJq5GlCNIkaUVtLTVqGZkMkQyhDKiVSmZVMmQzMhmprDtNs9Un0rF9ygn8d2dD6K6t+/aWo7OsrpU/youT8WnIbX1q13U7xPqqeXH1nIC/8AE8Z33og0+7sxbDz1Fl1ufYzHd+E+L12W+S/h9LpprCO2iInhekiIgIiICIiAiIgIiICIiAiIgS7U1YpouuPKqux/uqW/KfyVtO0kpnuLH6zMc/ACf0p6Udb1OytUe2wLWPtsFP8ATvT+Y9e/7RvZhfNQFP4T0dNN5o5P+X4pmZDJlMzIZ9N5VSNKEaRoZQjSolYjSmtpEjSitpUQtraU1tIq2lFbSk1bW0pRpCjSmtpUStRpQhkdbShDKiVaGZlMlQzOhlpct0od9+2wD1alIJ9u4N0D7bfCe8dEND/p9BpKfoU1jzxk/jPCb1N3UVDnq9XWPsb+8f6Z/RaKAAByAAHgJ+d58vVnb5r6/HNYyPqIicVkREBERAREQEREBERAREQEREDzT05avGm0tGf3txY/VrUg/FxP56sfeYseZJJ8TPYfTrrd7WU0g/utOx+3aWH4Is8eaphzB8cfnPZ0mt1z5Oz6UzMpkymZlM9zz1ShmdGkiGZ0MqJqtDKEMjQyhGlIq2tpShkNbSmsyolbW0oraRVtKUaVE1ajShGkdbSitpUTViGfuqu3K7G+irEeOOExIZPtp/2JUc3ZF+OT8AZnJl6cLfEMZvKR9dDtJ1m1tmVdlK23nxVcD8Z73PHfRFp+s2nrLjy09FVQP8zHLD3AT2Kfnsu760IiJLSIiAiIgIiICIiAiIgIiICJ8u4HEkDxkGp2zSh3d4Z7ASB+M3Q8b9KnR/VvtK20KjraK+qVbK+sKKiqcVFg59YHkDznB6vR20kLbXZUTxC2qyEj2BgMzvfSXsi/Vax9VWRuslajG9jCjlvD2knznCW6DVj1SqsFzhcrjszjeHDJ8Jum7SlQeYB8QJibTJ3Y8DPvU1uikvS6cvXQEoOIHEgkS3TanQuqhxqEYKAXqetwzdrdSyhhnu35UzynasuMv2a3/TjsJ859Ck+wzbDZ1D46rWVZPzNTXZS39HWKPNhPodHtWQTXULwvbpXrv/pqZmHmBOuPU8k/KLxY1qwpHMGZkafFoattxw1bfQcFW9x4z6W3wPiJ3x6zzHO8HiqUaUVtIltHd7j+szJcveR4j9J2x6rjvf4cbwZRsEaUVtIK7R3j3/rKq3/wz0Y8uGXaueWGU7xdW0oRpFW0pradY5VajSLa1mWpX2sx8sD+4yiszU7Xvw9jdldfx4n8xOHV5a4r+XTgm849I9Bmm/6bWak/941LgfVrAUfnPTJyfoq0PUbI0SkYLp1jfWsJb851k+Je76RERMCIiAiIgIiICJ+MwHOYX1QHLjN0M8+WcDmQPGa+7WMeXDwml2to77uNeoar+XdDA+Yw39U2Yje6ra1VfAsM93afAcz5Cc7tHpmqkqAU7msVlUnswcH8py+t6PareLuq3DmBp2FbnxLD8Gmj1Fb1MXuVqscALUe057N124fdlajG82l0pdgesYjPL/TuN4+Ckbx8Mmc9qmLEvqGeqvGQlm8jsx5fIUHj7CZ+07yhtQ6hjyV3uWkHP8tZyPMmS12KM3uTY5P7NTVZaFPsexsY9vAShC9tqB7ULUIDncrLIzDjxDMQQfszB/2j1AAe3qnQ8usVWZvt14IPHvPIzLr6sL1+p3GY727UTWoBPaFXt82M1Go05IDWF15dWtJYjHEnsz7eEwbZdt6ZwxtoasY4FGBJ4Z/d2DOCOR3iDkcp8vodnXKW30TvFytURnlkjK+eZz15ZyHY1EKd3csADHA5kD8cefZBJdkdkdKhkruEbo4kkndGceGOUDdXdCzjeqLlcZBrIsTHf6vZNVdsLUIRulW3ezipB8OUl0moYvvLYF6sEqfWQkcMkEEAZPtPhNxpukmr3mLMzoCQVuFdoHEDtG+cc+GOA5TNQ2mG3tp0jday5l+jdi+sDuCOCvwnwvSOpsdfotM2PnUh9O5PhWy1/wBJm00XSRLAxt06Nj59DPXjngNvhl3sAnAmZ7dn2rl9+o8Mi+re58vWrLc/CZpu2qXVbOccG1mnJ7+q1KDz/ZEDzMzps2t89RrNJYB2Oz0N/wCqor/rMyv0a01v7myts8uptXP3W9byxNbruiNqdpGOyxSPjHyfC23YerVd46e1l/3KR1yf+ZUWX4yBLccjgjng8fOSrs/WUtv153hydGO8PAg5Eqs6Ta/ArvZ7Ry/6pK7zz44NysV4Z4gjE1j6XWWL2/54yqnbDjmAfA/rmc+rfRdx4+v5cOA8zMqPZ2br8QMLxYczxAOBwB7ZWOeWPa6Tccb3jq9PttT8oEeXD4Z/CQbUs6xbAvO+yusY/mIUfACYhs8kZrv0lvHGBd1Lfd1S1/DM6Tol0S1t+s0e9prVqquW2yx1xXuLxG6/yX4/RJl582ec1lU48eON3I9+2bphVTVUP4aIv3VAlMRPM6kREBERAREQPi6zdUnnjHAe3hIzrc+yUa/Si6t6m5OCM93cZx9+w9p6cg6e8Xpk5S3BO7g4ChuXHHzu+VjodMWzMbTjKumRr6wavTvUa33C1fby9YIezz7Jv9JtzT28FtTJ+ZZ6jeQbn5Zli9p8Ez7ZscwRPg4M0Y2nwwzMjf4eyYn8Dj2f5mBqdd0e0dpy1KBue8g3Wz35XBmq1fRQ/wAK9h/LcAw8ARg/jOoBHZ7v/ifhgeZ7R6O6lDvNQGx/EoIY48DhvxnL6/Sgth98H6DlkIx/KcT295rtdp6rARYisO4gH4GYx4nqlJbecrw5KyLu48vxGJG1O++WQhD82tslRnmFJ4/CeobQ6M6VvkKyfUOB905X4Tntf0Pc/u7RjuYbrfeGR8BA4y4l+G+QuAAbE5gZ4b3f+MxMgYsK690ZXJrf5owfknnxyeU3ms2Bq6wFCMR62WGXHngn8BINRpUSoA5607w3EQj1ccywY58MTBItxXerUl8sQeuVjuqDzLL8nOeP5T9XFde4FUs5ID1Y3jwwQcjeI88eyZkXq03t4neB9VypHLHyQTg+M+dLpVbeZgnH5yZbHsJGd3yECW/1Vy+8W5lbQGGcDHH/ADwlmj2rqKVWxbnwM+pW7bp+SQGVshu3Ix2zEaMNlrC2CSBzXJ5E54k+QMwWo7nioIB+acMR2cuOIG/0vSV3I62qkKOLG0bjNnluFSpz28c+UtG29JvYNbjeXO+DVagPcFY8T2cz2TkKNSa8qUDZxhTvZHcBg8v0mRtK+cXL1Q4n5OHGO8Ejh7eMMdotmlsJU6mmzgCKrxgj6u+Cox3DumDVdFRYCxr3ACD1lGbOzuV90DwA5TQaDZdrgitdxST+0cHJHeo4E/aGJ02ytgisl8ksVAaxjj1B8AOE0aNth2g/s7S2D8l+PwYET2f0K0Pp9C2mtwHFjWBAcla2CjjjkSwY49s851W1aaSFr/aOSq8OQJ5f5w8TPTvRnsy5OuvuDAWKgQtwyMkndHYOXjJy7Nju4iJDSIiAiIgIiICIiBBtDY2n1G91tSsWGC2OOPGau/oXpGXGHB+mG4+YPD4To4m7HDP0T1mn46PUkgcq2OB91soZJZtnWac41elyP9xMp554qfLE9En4RngePsm+qjiNJ0k0tnDrDWfo3Dd/qGV+M2gbI3hhgeTKcg+BEr2h0X0d2d6pVJ+dX6p+HD4TndR0CsqJfR6lkP0WJXPiy8/MTZkNma1PYCf5uJ95nw1fcT4Zz+M0N1+1dL+/pF6j5wHHH16+A8xPrS9LNM3CwWUn2jfT3rx+AlbG4KnHHn7OUmvWU6a9LRmp67R3owOPEdnnPyxe8Y8YGmvWRWJNzfRma+6iaNcyyfUadX+Wqt9YAn3niJe1c+CkDjtqdEza28jJjPCshlXHcTkk58fdOf1mwdXUSRT6oPAg54cOORyHxnqIWfszQ8cuuK76neZhgDeGQO3gTjGezIHDszywO5yFsRk78ZBx2cGnsWo0VVmd9FPtI4++aSzo9o6m65lVeIA6w5G8Tw3VPaT4mYxxmg2VdaB1ahVPO2wNkjuCkkN5AD2zptmdGEQg7u+/MEjOD/KvJfH4zZ7Z2rpdCP27YbjimvDWsQOTH5NfZz48eU/dNotdr3WulNyo7xdEJ9YEDc32PE49bmQOXDuzY+2oWus2qFsCsEO6wwLD2Fhz4c8e/u11Ox9pbTuaqhStSNhrcblS5QHOTzIJ7N5p6V0c9HldDB9Q/WAEsKBnqxY3NifnHHgJ29aBQFUAAcgBgDwAkS35234cR0Q9Gej0O7ZaBqbxunfcfs1deRSsk8eA4nJ4dk7mIgIiICIiAiIgIiICIiAiIgIiICIiAmt2jsHS6jPW0oSfnAbrfeHGbKIHCbQ9HNed/TXNWw5B+OD7HXBHxmst0u2dJzH+oQd460Y8Riz3z06Jux5bR0tqJ3dRQ9R7WrO8PNTgj4zaaa/T6jhTdW5PzCd1/unDfCdlr9lae8YuqR/aRx8m5icxtL0daWzJqZ6j3H119x4/Gb6hFfs1h2EfEe8SKzRsOzPhMr9HtraT9zb1qj5u9vDHduWcvszCOktlZ3dZpSD2smUb7rc/vSvUJ3qImO4hFL2MqKvEu5AUDxMr1fSbQ44Pah7jUWPl2fGaDaCDWvV1dTPuFiptw1hY4AO6vqpgA8B3842ItodI2J3NJXvE/wAe4EJ4onAty5ndHtMx6PZV2psGN+6wgDfPE8hvbgHBFz3D9Z3OwvR8Th9Sd0fQX5R8T2TvNn7PqoXcqQIPZzPieZk3JjgtgejCkMl2rAZlyVQcSCxyePIchy989B0ulrqUJWqoo7FGP/0zNElpERAREQEREBERAREQEREBERAREQEREBERAREQEREBERATHfQlg3XVXHcwBHuMyRA5zWdCNBa28aivsRiAfL9JttmbJo0y7tKBfbzPvlsQEREBERAREQEREBERAREQERED/9k=",
      60133157243
    ),
    new GarageItem(
      "handphone",
      100,
      "https://www.zoobbay.com/wp-content/uploads/2019/10/refurb-iphoneX-spacegray_FMT_WHH.jpeg",
      601113600010
    ),
    new GarageItem(
      "Lamborghini",
      1000,
      "https://scdn.slashgear.com/wp-content/uploads/2020/01/lamborghini-aventador-svj-roadster-04-1280x720.jpg",
      60132618594
    )
  ];
}
