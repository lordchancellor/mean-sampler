import { Component } from '@angular/core';

@Component({
	selector: 'na-messages',
	template: `
		<div class="row">
			<na-message-input></na-message-input>
		</div>
	
		<hr>
	
		<div class="row">
			<na-message-list></na-message-list>
		</div>
	`
})
export class MessagesComponent {

}
