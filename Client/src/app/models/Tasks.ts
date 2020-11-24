export class Task {
   taskTypeId:string;
   clientId: string;
   projectId:string;
   subprojectId:string;
   userId: string;
   title: string;
   description: string;
   additionalContent: string;
   remark: string;
   links: string;
   files: string;
   faultId: string;
   createdBy: string;
   dueDate:Date;
   completedDate:Date;
   sendMail:boolean;
   clientAccess:boolean;
   statusId:string;
   priorityId: string;
}