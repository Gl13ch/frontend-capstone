import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: [ './message-detail.component.css' ]
})
export class MessageDetailComponent implements OnInit {
  message: Message | undefined;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMessage();
  }

  getMessage() {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.message) {
      this.messageService.updateMessage(this.message)
        .subscribe(() => this.goBack());
    }
  }
}
