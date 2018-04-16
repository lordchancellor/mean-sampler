import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header.component';

import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';

import { AuthenticationComponent } from './auth/authentication.component';

const messageComponents: any[] = [
    MessagesComponent,
    MessageComponent,
    MessageListComponent,
    MessageInputComponent
];

const authComponents: any[] = [
    AuthenticationComponent
]

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        messageComponents,
        authComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}