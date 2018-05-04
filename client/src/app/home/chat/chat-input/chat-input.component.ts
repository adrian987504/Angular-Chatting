import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Message } from '../../../models';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Output() onSend = new EventEmitter<String>();
  @Output() onStateChange = new EventEmitter<boolean>();
  @Input() stateMessages: Message[];
  
  inputState: boolean;
  model: any = {};
  timer: any;
  constructor() { }

  ngOnInit() {
    this.inputState = false;
  }
  send() {
    this.onSend.emit(this.model.text);
  }
  updateInput() {
    if (this.inputState && this.model.text == '') {
      this.updateState();
    }
    if (!this.inputState && this.model.text != '') {
      this.updateState();
    }
  }

  updateState(isUser: boolean = false) {
    this.inputState = !this.inputState;
    this.onStateChange.emit(this.inputState);
    clearTimeout(this.timer);
    if (!isUser && this.inputState) {
      const self = this;
      this.timer = setTimeout(function(){
        self.updateState(true);
      }, 5000);
    }
  }
  get stateMessage() {
    if (!this.stateMessages || this.stateMessages.length == 0) {
      return '';
    }
    let userNameArray = [];
    for (let msg of this.stateMessages) {
      userNameArray.push(msg.author);
    }
    return userNameArray.join(', ') + (this.stateMessages.length == 1 ? ' is ' : ' are ') + 'typing';
  }
}
