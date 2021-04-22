export class Task {
  title: string;
  description: string;
  additionalContent: string;
  remark: string;
  taskTypeId: string;
  projectId: string;
  subprojectId: string;
  clientId: string;
  links:any[];
  files: string;
  faultType: string;
  status: string;
  priority: string;
  //? צריך חהיות שם,רשימה נפתחת?
  userId: string;
  dueDate: Date;
  sendMail: boolean;
  clientAccess: boolean;
  createdDate:Date;
  createdBy: string;
  completedDate: Date;
  open: false;

  
}
