import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';

import { Message } from './message.model';

@Component({
	selector: 'na-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent {

	constructor(private messageService: MessageService) {}

	// Component Functionality Methods
	onSubmit(form: NgForm): void {
		const message: Message = new Message(form.value.content, 'Chris');

		this.messageService.addMessage(message);
		form.resetForm();
	}

}
