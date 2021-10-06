import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ControllerComponent } from './controller/controller.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'controller',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: 'controller', component: ControllerComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
