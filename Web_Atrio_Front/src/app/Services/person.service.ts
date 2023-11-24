import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Person } from '../Models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:24772/persons';

  constructor(private http: HttpClient) {}

  saveNewPerson(person: Person): Observable<Person> {
    // Check if age is less than 150 before saving
    const age = this.calculateAge(person.dateOfBirth);

    if (age >= 150) {
      return throwError('Person must be less than 150 years old.');
    }

    // If age is valid, proceed with saving
    return this.http.post<Person>(`${this.apiUrl}/persons`, person);
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/persons`);
  }

  // Add other methods for person-related operations

  private calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  addJobToPerson(personId: number, jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/persons/${personId}/jobs`, jobData);
  }

  getAllPersonsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/persons/details`);
  }

  getPersonsByCompany(companyName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/persons/bycompany/${companyName}`);
  }
}