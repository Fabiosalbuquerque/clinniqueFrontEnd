import { Injectable } from '@angular/core';
import { MessagesComponent } from 'app/pages/messages/messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private message: MessagesComponent) { }

  setMessage(title: string, content: string) {
    this.message.setTitle(title);
    this.message.setAddContent(content);
    this.message.openDialog();
  }
}
