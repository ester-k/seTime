import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MaterialModule } from './material.module';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './components/project/project.component';
import { UserScreenComponent } from './components/user-screen/user-screen.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { SubprojectComponent } from './components/subproject/subproject.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { ManagerScreenComponent } from './components/manager-screen/manager-screen.component';
import { WorkWeekComponent } from './components/work-week/work-week.component';
import { DragDropModule}from '@angular/cdk/drag-drop';
import { ProfileComponent } from './components/profile/profile.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CommonModule } from '@angular/common';
import { ManageTableComponent } from './components/manage-table/manage-table.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { NguCarouselModule } from '@ngu/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { 
// 	IgxCarouselModule,
// 	IgxSliderModule
//  } from "igniteui-angular";
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainPageComponent,
    ToolBarComponent,
    MenuComponent,
    ProjectsComponent,
    AddProjectComponent,
    TaskComponent,
    AddTaskComponent,
    SignUpComponent,
    TaskListComponent,
    AddEmployeeComponent,
    ProjectComponent,
    UserScreenComponent,
    ReportsComponent,
    ManagerComponent,
    AddClientComponent,
    SubprojectComponent,
    WeeklyComponent,
    ManagerScreenComponent,
    WorkWeekComponent,
    ProfileComponent,
    ManageTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule ,
    DragDropModule , 
    DragAndDropModule,   
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    IvyCarouselModule,
    NguCarouselModule,
    NgbModule,
  //   IgxCarouselModule,
	// IgxSliderModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false,showError: false }
    }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
