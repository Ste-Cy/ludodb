import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GameService } from 'src/app/core/services/game.service'
import { Game } from 'src/app/core/models/game'
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  gameList!: Game[];
  isLoggedIn!: boolean;

  constructor(
    private _router: Router,
    private _gameService: GameService,
    private _autService: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this._autService.isLoggedIn();
    this._gameService.getGames().subscribe((res) => {
      if (res) {
        this.gameList = res.data;
      } else {
        this._snackBar.open('Ehec dans le chargement des jeux', 'OK');
      }
    });
  }
  goTo(game: Game): void {
    this._router.navigate(["/collection", game.id]);
  }

  onAddGame() {
    this._router.navigateByUrl('/collection/add');
  }
}
