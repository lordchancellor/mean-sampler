import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
	selector: 'na-logout',
	template: `
		<div class="col-md-8 col-md-offset-2">
			<button class="btn btn-danger" (click)="onLogout()">Logout</button>
		</div>
	`
})
export class LogoutComponent {

	constructor(private router: Router, private authService: AuthService) {}

	// Component Functionality Methods
	onLogout(): void {
		this.authService.logout();
		this.router.navigate([ '/auth', 'signin' ]);
	}

}
