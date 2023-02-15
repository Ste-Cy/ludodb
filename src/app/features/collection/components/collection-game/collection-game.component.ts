import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service'
import { Game } from '../../../../core/models/game'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-collection-game',
  templateUrl: './collection-game.component.html',
  styleUrls: ['./collection-game.component.scss']
})
export class CollectionGameComponent implements OnInit {
  isLoggedIn!: boolean;
  game!: Game;
  gameId!: number;

  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _autService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this._autService.isLoggedIn();
    const id = this._route.snapshot.paramMap.get("id");
    if (id) {
      this.gameId = +id;
      if (isNaN(this.gameId)) {
        this._router.navigate(["/collection"]);
      } else {
        this._gameService.getGameById(this.gameId).subscribe(res => {
          if (res) {
            this.game = res.data;
          } else {
            this._router.navigate(["/collection"]);
          }
        });
      }
    }
  }
  onEdit() {
    this._router.navigateByUrl(`/collection/${this.gameId}/edit`);

  }
  onDelete() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes vous sur de vouloir supprimer le jeu ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._gameService.deleteGame(this.gameId).subscribe((res) => {
          if (res) {
            this._router.navigate(["/collection"]);
            this._snackBar.open('Le jeu est bien supprimé', 'OK');
          } else {
            this._snackBar.open('Erreur: le jeu n\'a pas pu être supprimé', 'OK');
          }
        });
      }
    });
  }

  onGoBack() {
    this._router.navigateByUrl('/collection');
  }
}
