import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Message } from './message';
import { SuccessService } from './success.service';


@Injectable({ providedIn: 'root' })
export class MessageService {

  private messagesUrl = 'http://localhost:3000/messages/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private successService: SuccessService) { }
  /** GET messages from the server */
  getMessages(): Observable<Message[]> {
  return this.http.get<Message[]>(this.messagesUrl)
    .pipe(
      tap(_ => this.log('fetched messages')),
      catchError(this.handleError<Message[]>('getMessages', []))
    );
}

  /** GET hero by id. Return `undefined` when id not found */
  getMessageNo404<Data>(id: string): Observable<Message> {
    const url = `${this.messagesUrl}/?id=${id}`;
    return this.http.get<Message[]>(url)
      .pipe(
        map(messages => messages[0]), // returns a {0|1} element array
        tap(m => {
          const outcome = m ? `fetched` : `did not find`;
          this.log(`${outcome} message id=${id}`);
        }),
        catchError(this.handleError<Message>(`getMessage id=${id}`))
    );
  }

  /** GET message by id. Will 404 if id not found */
  getMessage(id: string): Observable<Message> {
    const url = `${this.messagesUrl}/${id}`;
    return this.http.get<Message>(url).pipe(
      tap(_ => this.log(`fetched message id=${id}`)),
      catchError(this.handleError<Message>(`getMessage id=${id}`))
    );
  }

  /* GET messages whose name contains search term */
  searchMessages(term: string): Observable<Message[]> {
    if (!term.trim()) {
      // if not search term, return empty message array.
      return of([]);
    }
    return this.http.get<Message[]>(`${this.messagesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found messages matching "${term}"`) :
         this.log(`no messages matching "${term}"`)),
      catchError(this.handleError<Message[]>('searchMessages', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new message to the server */
  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.messagesUrl, message, this.httpOptions).pipe(
      tap((newMessage: Message) => this.log(`added message w/ id=${newMessage._id}`)),
      catchError(this.handleError<Message>('addMessage'))
    );
  }

  /** DELETE: delete the Message from the server */
  deleteMessage(id: string): Observable<Message> {
    const url = `${this.messagesUrl}/${id}`;

    return this.http.delete<Message>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted message id=${id}`)),
      catchError(this.handleError<Message>('deleteMessage'))
    );
  }

  /** PUT: update the Message on the server */
  updateMessage(message: Message): Observable<any> {
    return this.http.put(this.messagesUrl, message, this.httpOptions).pipe(
      tap(_ => this.log(`updated message id=${message._id}`)),
      catchError(this.handleError<any>('updateMessage'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.success}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MessageService message with the SuccessService */
  private log(success: string) {
    this.successService.add(`MessageService: ${success}`);
  }
}
