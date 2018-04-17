import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './user.model';
import { Storage } from '../enums/storage';

@Component({
	selector: 'na-signin',
	templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

	signinForm: FormGroup;

	constructor(private router: Router, private authService: AuthService) {}

	// Initialisation Methods
	ngOnInit(): void {
		this.signinForm = new FormGroup({
			email: new FormControl('', Validators.compose([ Validators.required, Validators.email ])),
			password: new FormControl('', Validators.required),
		});
	}


	// Component Functionality Methods
	onSubmit(): void {
		const formData: any = this.signinForm.value;
		const user: User = new User(formData.email, formData.password);

		this.authService.signIn(user).subscribe(
			res => {
				console.log(res);
				localStorage.setItem(Storage.Token, res.token);
				localStorage.setItem(Storage.UserID, res.userId);

				this.router.navigateByUrl('/');
			},
			err => console.log(err)
		);

		this.signinForm.reset();
	}

}
