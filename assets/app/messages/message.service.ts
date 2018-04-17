import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Message } from './message.model';
import { Storage } from '../enums/storage';

@Injectable()
export class MessageService {

	private messages: Message[] = [];
	shouldEdit: EventEmitter<Message> = new EventEmitter();

	constructor(private http: HttpClient) {}

	addMessage(message: Message): Observable<any> {
		const token: string = localStorage.getItem(Storage.Token) ? `?token=${localStorage.getItem(Storage.Token)}` : ``;
		const url: string = `http://localhost:3000/message${token}`;
		const body: string = JSON.stringify(message);
		const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.post(url, body, { headers })
			.map((res: any) => {
				const message: Message = new Message(res.obj.content, res.obj.user.firstName, res.obj._id, res.obj.user._id);

				this.messages.push(message);

				return message;
			});
	}

	getMessages(): any {
		const url: string = 'http://localhost:3000/message';

		return this.http.get(url)
			.map((res: any) => {
				const messages = res.messages;
				let transformedMessages: Message[] = [];

				for (const message of messages) {
					transformedMessages = [ ...transformedMessages, new Message(message.content, message.user.firstName, message._id, message.user._id) ];
				}

				this.messages = transformedMessages;

				return transformedMessages;
			});
	}

	editMessage(message: Message): void {
		this.shouldEdit.emit(message);
	}

	updateMessage(message: Message): Observable<any> {
		const token: string = localStorage.getItem(Storage.Token) ? `?token=${localStorage.getItem(Storage.Token)}` : ``;
		const url: string = `http://localhost:3000/message/${message.messageId}${token}`;
		const body: string = JSON.stringify(message);
		const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.patch(url, body, { headers });
	}

	deleteMessage(message: Message): Observable<any> {
		const token: string = localStorage.getItem(Storage.Token) ? `?token=${localStorage.getItem(Storage.Token)}` : ``;
		const url: string = `http://localhost:3000/message/${message.messageId}${token}`;

		this.messages.splice(this.messages.indexOf(message), 1);

		return this.http.delete(url);
	}

}
