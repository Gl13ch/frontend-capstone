import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Message } from './message';
import { MESSAGES } from './mock-messages';
import { SuccessService } from './success.service';

@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor(private successService: SuccessService) { }

  getMessages(): Observable<Message[]> {
    const messages = of(MESSAGES);
    this.successService.add('MessagesService: fetched messages');
    return messages;
  }

  getMessage(id: number): Observable<Message> {
      const message = MESSAGES.find(m => m.id === id)!;
      this.successService.add(`MessageService: fetched message id=${id}`);
      return of(message);
    }
  }
