import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { ErrorService } from '../errors/error.service';

import { Message } from './message.model';

@Component({
	selector: 'na-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {

	message: Message;

	constructor(private messageService: MessageService, private errorService: ErrorService) {}

	// Initialisation Methods
	ngOnInit(): void {
		this.messageService.shouldEdit.subscribe(
			(message: Message) => {
				console.log(message);
				this.message = message}
		);
	}


	// Component Functionality Methods
	onSubmit(form: NgForm): void {
		if (this.message) {
			this.message.content = form.value.content;

			this.messageService.updateMessage(this.message).subscribe(
				res => console.log(res),
				err => {
					console.log(err);
					this.errorService.handleError(err);
				}
			);

			this.message = null;
		}
		else {
			const message: Message = new Message(form.value.content, 'Chris');
	
			this.messageService.addMessage(message).subscribe(
				res => console.log(res),
				err => {
					console.log(err);
					this.errorService.handleError(err);
				}
			);
		}

		form.resetForm();
	}

	onClear(form: NgForm): void {
		this.message = null;
		form.resetForm();
	}

}
