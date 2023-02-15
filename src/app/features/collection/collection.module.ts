import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionRoutingModule } from './collection-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CollectionComponent } from './components/collection/collection.component';
import { CollectionAddComponent } from './components/collection-add/collection-add.component';
import { CollectionGameComponent } from './components/collection-game/collection-game.component';
import { CollectionGameEditComponent } from './components/collection-game-edit/collection-game-edit.component';
import { CollectionGameFormComponent } from './components/collection-game-form/collection-game-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'; 

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionAddComponent,
    CollectionGameComponent,
    CollectionGameEditComponent,
    CollectionGameFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
