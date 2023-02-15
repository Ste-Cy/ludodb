import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-collection-game-edit',
  templateUrl: './collection-game-edit.component.html',
  styleUrls: ['./collection-game-edit.component.scss']
})
export class CollectionGameEditComponent implements OnInit {
  gameId!: string | null;
  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get("id") || null;

  }

  onGoBack() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Les modifications seront perdues. Voulez vous continuer ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._router.navigate(["collection", this.gameId]);
      }
    });
  }
  onFormEvent($event: any) {
    const data = $event.data;
    const file = $event.file;
    if (this.gameId) {
      this._gameService.updateGame(data, +this.gameId).subscribe((res) => {
        if (res) {
          if (file && this.gameId) {
            this._gameService.uploadCover(file, +this.gameId).subscribe((res) => {
              if (!res) {
                this._snackBar.open('Erreur lors du téléchargement de l\'image de couverture', 'ok');
              }
            })
          }
          this._router.navigate(["collection", this.gameId]);
          this._snackBar.open('Le jeu a bien été mis à jour', 'OK');
        } else {
          this._snackBar.open('Erreur: le jeu n\'a pas pu être mis à jour', 'OK');
        }
      });
    }
  }
}


