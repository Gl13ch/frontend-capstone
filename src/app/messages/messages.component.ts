import { Component, OnInit } from '@angular/core';

import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages()
    .subscribe(messages => this.messages = messages);
  }

  add(name: string): void {
   name = name.trim();
   if (!name) { return; }
   this.messageService.addMessage({ name } as Message)
     .subscribe(message => {
       this.messages.push(message);
     });
   }

  delete(message: Message): void {
    this.messages = this.messages.filter(m => m !== message);
    this.messageService.deleteMessage(message._id).subscribe();
  }

  // update(message: Message): void {
  //   this.messages = this.messages.filter(m => m !== message);
  //   this.messageService.updateMessage(message._id).subscribe();
  // }
}
