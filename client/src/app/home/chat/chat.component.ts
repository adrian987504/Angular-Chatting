import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Message } from '../../models'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [WebsocketService]
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  stateMessages;
  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit() {
    this.websocketService.initSocket();
    this.websocketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
    });
    this.websocketService.initSocket();
    this.websocketService.onState()
      .subscribe((messages: any) => {
        const email = localStorage.getItem('email');
        this.stateMessages = messages as Message[];
        console.log(this.stateMessages);
        // this.messages.push(message);
    });
    
    this.websocketService.getHistory()
        .subscribe(
          data => {
            for (let message of data.data) {
              this.messages.push(message);
            }
          },
          error => {
            console.log(error);
          }
        )
    // this.websocketService.onEvent('connect')
    //   .subscribe(() => {
    //     console.log('connected');
    //   });

    // this.websocketService.onEvent('disconnect')
    //   .subscribe(() => {
    //     console.log('disconnected');
    //   });
    //   export enum Event {
    //     CONNECT = 'connect',
    //     DISCONNECT = 'disconnect'
    // }
    
  }
  onSend(text: String) {
    const email = localStorage.getItem('email');
    const message = {body: text, author: email}
    // this.messages.push(message);
    this.websocketService.send(message);
  }
  onChange(state: Boolean) {
    const email = localStorage.getItem('email');
    const text = state ? email + " is typing now" : '';
    const message = {body: text, author: email};
    this.websocketService.sendState(message);
  }
}
