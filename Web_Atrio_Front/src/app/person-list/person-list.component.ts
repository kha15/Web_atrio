import { Component, OnInit } from '@angular/core';
import { PersonService } from '../Services/person.service';
import { Person } from '../Models/person.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../Services/job.service';
import { Job } from '../Models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl:'./person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  personForm: FormGroup;
  jobForm: FormGroup;
  selectedPerson: Person | null = null;
  jobs: Job[] = [];
  selectedCompanyName: string = '';

  constructor(private fb: FormBuilder,private router: Router, private personService: PersonService, private jobService: JobService) {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
    });

    this.jobForm = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
    });
  }

  ngOnInit(): void {
    this.router.navigate(['']);
    this.loadPersons();
    this.loadPersonsWithDetails();
  }

  loadPersons() {
    this.personService.getAllPersons().subscribe(
      (result) => {
        this.persons = result;
      },
      (error) => {
        console.error('Error loading persons:', error);
      }
    );
  }

  savePerson() {
    if (this.personForm.valid) {
      const newPerson: Person = this.personForm.value;

      this.personService.saveNewPerson(newPerson).subscribe(
        (result) => {
          console.log('Person saved successfully:', result);
          // Refresh the list after saving a new person
          this.loadPersons();
        },
        (error) => {
          console.error('Error saving person:', error);
        }
      );
    }
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.jobForm.reset();
  
    // Navigate to the JobListComponent with the person's ID as a parameter
    this.router.navigate(['/jobs', person.id]);
  }

  addJob() {
    if (this.jobForm.valid && this.selectedPerson !== null && this.selectedPerson !== undefined) {
      const jobData = this.jobForm.value;
  
      const nonNullSelectedPerson = this.selectedPerson;
  
      if (nonNullSelectedPerson.id !== null && nonNullSelectedPerson.id !== undefined) {
        const personId: number = nonNullSelectedPerson.id;
  
        this.personService.addJobToPerson(personId, jobData).subscribe(
          (result) => {
            console.log('Job added successfully:', result);
  
            // Use the local variable to ensure non-null status
            this.loadJobs(personId);
          },
          (error) => {
            console.error('Error adding job:', error);
          }
        );
      }
    }
  }

  private loadJobs(personId: number): void {
    this.jobService.getJobsByPersonId(personId).subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  loadPersonsWithDetails() {
    this.personService.getAllPersonsWithDetails().subscribe(
      (result) => {
        this.persons = result;
      },
      (error) => {
        console.error('Error loading persons with details:', error);
      }
    );
  }

  loadPersonsByCompany() {
    // Check if a company name is provided
    if (this.selectedCompanyName.trim() !== '') {
      this.personService.getPersonsByCompany(this.selectedCompanyName).subscribe(
        (result) => {
          this.persons = result;
        },
        (error) => {
          console.error(`Error loading persons for ${this.selectedCompanyName}:`, error);
        }
      );
    } else {
      console.warn('Please enter a valid company name.');
    }
  }
}
