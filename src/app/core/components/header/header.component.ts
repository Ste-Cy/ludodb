import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isLoggedIn!: boolean;
  @Output() loginEvent = new EventEmitter<any>();
  @Output() logoutEvent = new EventEmitter<any>();
  constructor(private _router: Router, public dialog: MatDialog) { }


  onLogin(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const username = result.value.username;
        const password = result.value.password;
        this.loginEvent.emit({ username, password })
      }
    });
  }

  onLogout(): void {
    this.logoutEvent.emit(true);
  }

  onGoHome(): void {
    this._router.navigateByUrl('/');
  }
}
