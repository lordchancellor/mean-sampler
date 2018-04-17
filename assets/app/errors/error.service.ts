import { Injectable, EventEmitter } from '@angular/core';

import { Error } from './error.model';

@Injectable()
export class ErrorService {

	errorOccurred: EventEmitter<Error> = new EventEmitter();

	handleError(error: any): void {
		const errorData = new Error(error.title, error.message);

		this.errorOccurred.emit(errorData);
	}

}
