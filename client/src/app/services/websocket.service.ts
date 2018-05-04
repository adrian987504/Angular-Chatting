import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Message } from '../models';

const SERVER_URL = 'http://localhost:8000';

@Injectable()
export class WebsocketService {
  // Our socket connection
  private socket;

  constructor(private http: HttpClient) {
    this.initSocket();
  }
  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }
  public send(message: Message): void {
    this.socket.emit('send:message', message);
  }
  public sendState(message: Message): void {
    this.socket.emit('send:state', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('send:message', (data: Message) => observer.next(data));
    });
  }
  public onState(): Observable<Message> {
    return new Observable<any>(observer => {
      this.socket.on('send:state', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: String): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
  getHistory() {
    return this.http.get('/api/message');
  }
}
