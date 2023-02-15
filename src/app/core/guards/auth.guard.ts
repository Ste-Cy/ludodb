import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
} from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  // retour un boolean
  canActivate() {
    // si l'authentification est ok
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      // sinon on redirige vers la page de login
      this._router.navigate(["/login"]);
      return false;
    }
  }
}