import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { Storage } from '../enums/storage';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {}

	signUp(user: User): Observable<any> {
		const url: string = `http://localhost:3000/user`;
		const body: string = JSON.stringify(user);
		const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.post(url, body, { headers });
	}

	signIn(user: User): Observable<any> {
		const url: string = `http://localhost:3000/user/signin`;
		const body: string = JSON.stringify(user);
		const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.post(url, body, { headers });
	}

	logout(): void {
		localStorage.removeItem(Storage.Token);
		localStorage.removeItem(Storage.UserID);
	}

	isLoggedIn(): boolean {
		return localStorage.getItem(Storage.Token) !== null;
	}

}
