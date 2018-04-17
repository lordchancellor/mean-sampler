import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ErrorService } from '../errors/error.service';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
	selector: 'na-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;

	constructor(private authService: AuthService, private errorService: ErrorService) {}

	// Initialisation Methods
	ngOnInit(): void {
		this.signupForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', Validators.compose([ Validators.required, Validators.email ])),
			password: new FormControl('', Validators.required),
		});
	}


	// Component Functionality Methods
	onSubmit(): void {
		const formData: any = this.signupForm.value;
		const user: User = new User(formData.email, formData.password, formData.firstName, formData.lastName);

		this.authService.signUp(user).subscribe(
			res => console.log(res),
			err => {
				console.log(err);
				this.errorService.handleError(err);
			}
		);
		this.signupForm.reset();
	}

}
