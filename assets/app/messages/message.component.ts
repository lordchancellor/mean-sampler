import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from './message.model';

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

	@Output()
	editClicked: EventEmitter<string> = new EventEmitter();

	// Component Functionality Methods
	onEdit(): void {
		this.editClicked.emit('Jorge');
	}

}
