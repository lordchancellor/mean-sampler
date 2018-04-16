import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';

const messageComponents: any[] = [
    MessagesComponent,
    MessageComponent,
    MessageListComponent,
    MessageInputComponent
];

@NgModule({
    declarations: [
        AppComponent,
        messageComponents
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}