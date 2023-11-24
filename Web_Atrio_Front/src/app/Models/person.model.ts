import { Job } from './job.model';

export interface Person {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    jobs?: Job[];
  }