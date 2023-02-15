import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  username!: string;
  password!: string;
  form!: FormGroup;
  hide: boolean = true; // gestion affichage champ mot de passe

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
}
