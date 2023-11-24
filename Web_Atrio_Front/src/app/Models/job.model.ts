export interface Job {
    id?: number;
    companyName: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    personId?: number;
  }