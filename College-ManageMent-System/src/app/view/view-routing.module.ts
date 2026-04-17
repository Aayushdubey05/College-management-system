import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './role/admin/department/department.component';
import { ClassroomComponent } from './role/admin/classroom/classroom.component';
import { InfrastructureComponent } from './role/admin/infrastructure/infrastructure.component';
import { ExamComponent } from './role/admin/exam/exam.component';

const routes: Routes = [
  { path: 'department', component: DepartmentComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'infrastructure', component: InfrastructureComponent },
  { path: 'exam', component: ExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
