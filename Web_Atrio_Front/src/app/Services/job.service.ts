import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../Models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:24772/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobsByPersonId(personId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/persons/${personId}/jobs`);
  }
  
  getJobsByPersonAndDateRange(personId: number, startDate: Date, endDate: Date): Observable<Job[]> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    return this.http.get<Job[]>(`${this.apiUrl}/persons/${personId}/jobs`, { params });
  }
}
