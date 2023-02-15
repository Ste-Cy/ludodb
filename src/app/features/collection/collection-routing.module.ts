// TODO : ajouter guard pour l'ajout et l'édition

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionAddComponent } from './components/collection-add/collection-add.component';
import { CollectionGameComponent } from './components/collection-game/collection-game.component';
import { CollectionGameEditComponent } from './components/collection-game-edit/collection-game-edit.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: "collection",
    component: CollectionComponent,
  },
  {
    path: "collection/add",
    component: CollectionAddComponent, canActivate: [AuthGuard]
  },
  {
    path: "collection/:id",
    component: CollectionGameComponent
  },

  {
    path: "collection/:id/edit",
    component: CollectionGameEditComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
