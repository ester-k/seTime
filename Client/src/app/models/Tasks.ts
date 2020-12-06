export class Task {
  title: string;
  description: string;
  additionalContent: string;
  remark: string;
  taskTypeId: string;
  projectId: string;
  subprojectId: string;
  //ניתן לשלוף לפי המזהה של הפרוייקט
  clientId: string;
  links: string;
  files: string;
  faultId: string;
  statusId: string;
  priorityId: string;
  //? צריך חהיות שם,רשימה נפתחת?
  userId: string;
  dueDate: Date;
  sendMail: boolean;
  clientAccess: boolean;
   createdDate:Date;
  createdBy: string;
  completedDate: Date;
 
  
}
