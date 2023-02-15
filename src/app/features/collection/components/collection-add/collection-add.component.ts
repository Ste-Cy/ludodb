import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services/game.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-collection-add',
  templateUrl: './collection-add.component.html',
  styleUrls: ['./collection-add.component.scss']
})
export class CollectionAddComponent {


  constructor(
    private _router: Router,
    private _gameService: GameService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  onGoBack() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Les modifications seront perdues. Voulez vous continuer ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._router.navigateByUrl('/collection');
      }
    });

  }

  onFormEvent($event: any) {
    const data = $event.data;
    const file = $event.file;
    this._gameService.addGame(data).subscribe((res) => {
      console.log(res);
      if (res) {
        const gameId = +res.dataCreated.id;
        if (file) {
          this._gameService.uploadCover(file, gameId).subscribe((res) => {
            if (!res) {
              this._snackBar.open('Erreur lors du téléchargement de l\'image de couverture', 'ok');
            }
          })
        }
        this._router.navigate(["collection", gameId]);
        this._snackBar.open('Le jeu a bien été ajouté', 'OK');
      } else {
        this._snackBar.open('Erreur: le jeu n\'a pas pu être ajouté', 'OK');
      }
    });
  }
}
