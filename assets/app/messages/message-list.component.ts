import { Component, OnInit } from '@angular/core';

import { MessageService } from './message.service';

import { Message } from './message.model';

@Component({
	selector: 'na-message-list',
	template: `
		<div class="col-md-8 col-md-offset-2">
			<na-message *ngFor="let message of messages" [message]="message"></na-message>
		</div>
	`
})
export class MessageListComponent implements OnInit {
	messages: Message[];

	constructor(private messageService: MessageService) {}

	// Initialisation Methods
	ngOnInit(): void {
		this.messageService.getMessages().subscribe(
			(messages: Message[]) => this.messages = messages
		);
	}

}