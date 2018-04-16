import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'na-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;

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
		console.log(this.signupForm);
		this.signupForm.reset();
	}

}
