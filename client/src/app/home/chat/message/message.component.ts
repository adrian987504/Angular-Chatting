import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() msg: Message;
  fromMe: String;
  message: String;
  constructor() {

  }

  ngOnInit() {
    const email = localStorage.getItem('email');
    if (this.msg.author === email) {
      this.fromMe = "from-me"
    } else {
      this.fromMe = ""
    }
  }

}
