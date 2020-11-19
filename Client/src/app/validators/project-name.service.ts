import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, ValidatorFn } from '@angular/forms';
import { projectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectNameService {
   answer: boolean;
  constructor(private projectService: projectService) { }

  checkProjectName(Name) {
    {
      let projectName = Name.trim();
      if (projectName == "")
        return false;
      this.projectService.checkProjectName(projectName).subscribe((ans) => {
        this.answer = ans;
        console.log("1");
        
      })
      console.log("2");
      if (this.answer) {
        console.log("error");
        return true;
      }
      console.log('no error');
      return false;
    }
  }
}

