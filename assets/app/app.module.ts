import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';

import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header.component';

import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';

import { AuthenticationComponent } from './auth/authentication.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

import { ErrorComponent } from './errors/error.component';

const messageComponents: any[] = [
    MessagesComponent,
    MessageComponent,
    MessageListComponent,
    MessageInputComponent
];

const authComponents: any[] = [
    AuthenticationComponent,
    LogoutComponent,
    SigninComponent,
    SignupComponent
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        messageComponents,
        authComponents,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    providers: [
        AuthService,
        ErrorService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}