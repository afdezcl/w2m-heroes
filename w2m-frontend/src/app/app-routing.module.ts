import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import(`./components/heroes/heroes.module`).then(m => m.HeroesModule) },
  { path: 'add-hero', loadChildren: () => import(`./components/add-hero/add-hero.module`).then(m => m.AddHeroModule) },
  { path: 'edit-hero/:id', loadChildren: () => import(`./components/edit-hero/edit-hero.module`).then(m => m.EditHeroModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
