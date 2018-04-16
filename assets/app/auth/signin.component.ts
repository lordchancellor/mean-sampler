import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'na-signin',
	templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

	signinForm: FormGroup;

	// Initialisation Methods
	ngOnInit(): void {
		this.signinForm = new FormGroup({
			email: new FormControl('', Validators.compose([ Validators.required, Validators.email ])),
			password: new FormControl('', Validators.required),
		});
	}


	// Component Functionality Methods
	onSubmit(): void {
		console.log(this.signinForm);
		this.signinForm.reset();
	}

}
