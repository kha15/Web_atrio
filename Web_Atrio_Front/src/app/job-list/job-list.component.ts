import { Component, Input, OnInit, NgModule } from '@angular/core';
import { JobService } from '../Services/job.service';
import { Job } from '../Models/job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  @Input() personId: number | undefined;
  jobs: Job[] = [];
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    if (this.personId) {
      this.loadJobs(this.personId);
    }
  }

  private loadJobs(personId: number): void {
    this.jobService.getJobsByPersonId(personId).subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  loadJobsByDateRange(): void {
    if (this.personId) {
      // Check if selectedStartDate and selectedEndDate are not null before making the request
      if (this.selectedStartDate !== null && this.selectedEndDate !== null) {
        // Call your service method with selectedStartDate and selectedEndDate
        this.jobService.getJobsByPersonAndDateRange(
          this.personId,
          this.selectedStartDate,
          this.selectedEndDate
        ).subscribe((jobs) => {
          this.jobs = jobs;
        });
      } else {
        // Handle the case when either selectedStartDate or selectedEndDate is null
        console.log('Selected start date or end date is null');
      }
    }
  }
  
  
}
