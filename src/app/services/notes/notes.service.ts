import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateNote } from '../../model/ICreateNote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient
  ) { }

  serviceRoute = 'http://localhost:8002/';

  


  createNote(note: ICreateNote): Observable<object>{

    let requestHeader = this.getHeaders();

    // console.log(localStorage.getItem('key'));
    return this.http.post(this.serviceRoute + 'api/v1/notes', note, { headers: requestHeader });
    
  }

  getMyNotes(page: number): Observable<object> {
    
    let requestHeader = this.getHeaders();
    return this.http.get(this.serviceRoute + `api/v1/notes/mynotes?page=${page}&size=8`, { headers: requestHeader });
    
  }

  getCompletedNotes(page: number): Observable<object> {

    let requestHeader = this.getHeaders();
    return this.http.get(this.serviceRoute + `api/v1/notes/mynotes/completed?page=${page}&size=8`, { headers: requestHeader });

  }

  updateNote(id: number, note: ICreateNote): Observable<object> {
    
    let requestHeader = this.getHeaders();
    return this.http.put(this.serviceRoute + `api/v1/notes/${id}`, note, { headers: requestHeader });
  }

  deleteNote(id: number): Observable<object> {

    let requestHeader = this.getHeaders();
    return this.http.delete(this.serviceRoute + `api/v1/notes/${id}`, { headers: requestHeader });
    
  }

  getFilteredNotes(page: number, searchTerm: string, status: string, priority: string) {

    let requestHeader = this.getHeaders();
    return this.http.get(this.serviceRoute + `api/v1/notes/mynotes/filtered?search=${searchTerm}&status=${status}&priority=${priority}&page=${page}&size=8`, { headers: requestHeader });
  }

  getHeaders() : HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('key')
    });
  }

  
}
