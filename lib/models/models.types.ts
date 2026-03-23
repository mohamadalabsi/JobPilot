// we will export all the different typescript asociated types for the interfaces we created 

export interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  columnId?: string;
  tags?: string[];
  description?: string;
}

export interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplication[];
}

export interface Board {
  _id: string;
  name: string;
  columns: Column[];
}