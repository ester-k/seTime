import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ProjectComponent } from './components/project/project.component';
import { UserScreenComponent } from './components/user-screen/user-screen.component';
import { AppComponent } from './app.component';
import { ManagerComponent } from './components/manager/manager.component'
import { AddClientComponent } from './components/add-client/add-client.component';
import { SubprojectComponent } from './components/subproject/subproject.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { ManagerScreenComponent } from './components/manager-screen/manager-screen.component';
import { WorkWeekComponent } from './components/work-week/work-week.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'mainPage', component: MainPageComponent, children: [] },
  { path: 'toolBar', component: ToolBarComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'task', component: TaskComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'taskList', component: TaskListComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'project/:name', component: ProjectComponent },
  { path: 'userScreen', component: UserScreenComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'addClientComponent', component: AddClientComponent },
  { path: 'subproject', component: SubprojectComponent },
  { path: 'weekly', component: WeeklyComponent },
  { path: 'managerScreen', component: ManagerScreenComponent },
  { path: 'workWeek', component: WorkWeekComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: '*', redirectTo: 'signIn' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
