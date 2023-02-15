import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "collection", pathMatch: "full" },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  // onSameUrlNavigation => permet le reload des routes
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
