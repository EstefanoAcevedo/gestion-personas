import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './body/principal/principal.component';
import { AcercaComponent } from './body/acerca/acerca.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalComponent},
  {path: 'acerca', component: AcercaComponent},
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: '**', redirectTo: 'principal', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
