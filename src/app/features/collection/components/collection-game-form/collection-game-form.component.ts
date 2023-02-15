import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { minMaxValidator } from 'src/app/core/validators/min-max.validator';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-collection-game-form',
  templateUrl: './collection-game-form.component.html',
  styleUrls: ['./collection-game-form.component.scss']
})
export class CollectionGameFormComponent implements OnInit {
  game!: Game;
  @Output() formEvent = new EventEmitter<any>();
  isEditForm!: boolean; // test si il s'agit d'un formulaire d'édition ou d'ajout
  imagePreview!: string | undefined; // pour la pré-visualisation de l'image uploadé

  // élements du formulaire
  form!: FormGroup;
  playerMinCtrl!: FormControl;
  playerMaxCtrl!: FormControl;
  playerGroup!: FormGroup;
  durationMinCtrl!: FormControl;
  durationMaxCtrl!: FormControl;
  durationGroup!: FormGroup;
  displayPlayerGroupError$!: Observable<boolean>;
  displayDurationGroupError$!: Observable<boolean>;
  uploadFile!: File;


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.playerMinCtrl = this._fb.control(null, [Validators.min(1)]);
    this.playerMaxCtrl = this._fb.control(null, [Validators.min(1)]);
    this.playerGroup = this._fb.group(
      { playerMin: this.playerMinCtrl, playerMax: this.playerMaxCtrl },
      { validators: [minMaxValidator('playerMin', 'playerMax')], updateOn: 'blur' }
    )

    this.durationMinCtrl = this._fb.control(null, [Validators.min(5)]);
    this.durationMaxCtrl = this._fb.control(null, [Validators.min(5)]);
    this.durationGroup = this._fb.group(
      { durationMin: this.durationMinCtrl, durationMax: this.durationMaxCtrl },
      { validators: [minMaxValidator('durationMin', 'durationMax')], updateOn: 'blur' }
    )

    this.form = this._fb.group({
      title: [null, Validators.required],
      yearPub: [null],
      playerGroup: this.playerGroup,
      durationGroup: this.durationGroup,
      age: [null, Validators.min(1)],
      description: [null],
      cover: [null]
    })

    this.displayPlayerGroupError$ = this.playerGroup.statusChanges.pipe(
      map(
        (status) =>
          status == 'INVALID' &&
          this.playerMinCtrl?.value &&
          this.playerMaxCtrl?.value
      )
    );
    this.displayDurationGroupError$ = this.durationGroup.statusChanges.pipe(
      map(
        (status) =>
          status == 'INVALID' &&
          this.durationMinCtrl.value &&
          this.durationMaxCtrl.value
      )
    );

    // si il s'agir d'un formulaire d'édition
    this.isEditForm = this._router.url.includes("edit");
    if (this.isEditForm) {
      const id: string | null = this._route.snapshot.paramMap.get("id");
      if (id) {
        this._gameService.getGameById(+id).subscribe(res => {
          this.game = res.data;
          this.form.get('title')?.setValue(this.game.title);
          this.form.get('yearPub')?.setValue(this.game.yearPub);
          this.playerGroup.get('playerMin')?.setValue(this.game.playerMin);
          this.playerGroup.get('playerMax')?.setValue(this.game.playerMax);
          this.durationGroup.get('durationMin')?.setValue(this.game.durationMinutesMin);
          this.durationGroup.get('durationMax')?.setValue(this.game.durationMinutesMin);
          this.form.get('age')?.setValue(this.game.age);
          this.form.get('description')?.setValue(this.game.description);
          this.imagePreview = this.game.cover;
        });
      }
    }
  }

  // appelée lors de la sélection d'un fichier
  onFileChange(event: any) {

    const mineType = ['image/jpeg', 'image/png', 'image/webp']

    if (event.target.files && event.target.files.length > 0) {
      // on récupère le premier fichier 
      this.uploadFile = event.target.files[0];
      // applique la méthode readAsDataURL pour obtenir un aperçu. 
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadFile);
      if (mineType.includes(this.uploadFile.type)) {
        reader.onload = () => { this.imagePreview = reader.result?.toString() }
      } else {
        event.target.value = null;
        this._snackBar.open('Format d\'image invalide', 'ok');
      }
    }
  }
  onSubmit(): void {
    const data = {
      data: {
        title: this.form.value.title,
        yearPub: this.form.value.yearPub,
        playerMin: this.playerGroup.value.playerMin,
        playerMax: this.playerGroup.value.playerMax,
        durationMinutesMin: this.durationGroup.value.durationMin,
        durationMinutesMax: this.durationGroup.value.durationMax,
        age: this.form.value.age,
        description: this.form.value.description,
      },
      file: this.uploadFile

    }

    this.formEvent.emit(data);
  }
}
