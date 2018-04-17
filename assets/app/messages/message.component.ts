import { Component, Input } from '@angular/core';

import { MessageService } from './message.service';
import { ErrorService } from '../errors/error.service';

import { Message } from './message.model';
import { Storage } from '../enums/storage';

@Component({
	selector: 'na-message',
	templateUrl: './message.component.html',
	styles: [
			'.author { display: inline-block; font-style: italic; font-size: 12px; width: 80%; }',
			'.config { display: inline-block; text-align: right; font-size: 12px; width: 19%; }'
	]
})
export class MessageComponent {

	@Input()
	message: Message;

	constructor(private messageService: MessageService, private errorService: ErrorService) {}

	// Component Functionality Methods
	onEdit(): void {
		this.messageService.editMessage(this.message);
	}

	onDelete(): void {
		this.messageService.deleteMessage(this.message).subscribe(
			res => console.log(res),
			err => {
				console.log(err);
				this.errorService.handleError(err);
			}
		);
	}

	belongsToUser(): boolean {
		return localStorage.getItem(Storage.UserID) === this.message.userId;
	}

}
