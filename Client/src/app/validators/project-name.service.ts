import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { projectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectNameService {
  answer: boolean;
  constructor(private projectService: projectService) { }

  checkProjectName(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      let projectName = control.value.trim()
      if (projectName === "")
        return null;
      this.projectService.checkProjectName(projectName).subscribe((ans) => {
        this.answer=ans;
      })
           if (this.answer){
             console.log("error");
              return { projectNameError: "קיים פרויקט בעל שם זה." }
           }
           console.log('no error');
         return null;
    }
  }
  }

