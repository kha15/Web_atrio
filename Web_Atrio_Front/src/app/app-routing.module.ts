import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { JobListComponent } from './job-list/job-list.component';

const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'jobs', component: JobListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
