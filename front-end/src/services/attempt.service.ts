import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Attempt} from '../models/attempt.model';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {
  /*
   The list of user.
   */
  private attempts: Attempt[] = [];

  /*
   Observable which contains the list of the user.
   */
  public attempts$: BehaviorSubject<Attempt[]>
    = new BehaviorSubject([]);

  public attemptSelected$: Subject<Attempt> = new Subject();

  private attemptUrl = serverUrl + '/attempts';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveAttempts();
  }

  retrieveAttempts(): void {
    this.http.get<Attempt[]>(this.attemptUrl).subscribe((attemptList) => {
      this.attempts = attemptList;
      this.attempts$.next(this.attempts);
    });
  }

  setSelectedAttempt(attemptId: string): void {
    const urlWithId = this.attemptUrl + '/' + attemptId;
    this.http.get<Attempt>(urlWithId).subscribe((attempt) => {
      this.attemptSelected$.next(attempt);
    });
  }

  deleteAttempt(attempt: Attempt): void {
    const urlWithId = this.attemptUrl + '/' + attempt.id;
    this.http.delete<Attempt>(urlWithId, this.httpOptions).subscribe(() => this.retrieveAttempts());
  }

}
