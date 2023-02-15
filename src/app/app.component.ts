import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { AuthService } from './core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './features/collection/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn!: boolean;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.isLoggedIn = this._checkIsLoggedIn();
  }

  onLoginEvent($event: any) {
    const username = $event.username;
    const password = $event.password;
    if (username && password) {
      this._authService.login(username, password).subscribe(res => {
        if (res) {
          this._authService.setSession(res.token);
          this.header.isLoggedIn = true;
          this._snackBar.open('Vous êtes bien connecté', 'OK');
          // permet de reload la route courante
          this._router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
          this._router.navigateByUrl(this._router.url);

        } else {
          this._snackBar.open('Echec de la connexion', 'OK');
        }
      });
    }
  }

  onLogoutEvent() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir vous déconnecter ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._authService.logout();
        this.header.isLoggedIn = false;
        this._router.navigateByUrl('/collection');
      }
    });
  }

  private _checkIsLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }
}