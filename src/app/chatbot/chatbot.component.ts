import { Component, Renderer2 } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as LexRuntime from 'aws-sdk/clients/lexruntime';
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    CommonModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userMessage: string = '';
  messages: { sender: string, text: string }[] = [];
  lexRuntimeV2: AWS.LexRuntimeV2;
  sessionId: string = 'user-id'; // Replace with a unique session ID

  constructor() {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:03e6cb34-ddb0-42f4-b375-6f2f3fc5332d',
    });

    this.lexRuntimeV2 = new AWS.LexRuntimeV2();
  }

  ngOnInit(): void {
    this.sendMessage('welcome', false);
  }

  sendMessage(inputText?: string, displayUserMessage: boolean = true): void {
    const message = inputText || this.userMessage.trim();
    if (message === '') {
      return;
    }

    if (displayUserMessage) {
      this.messages.push({ sender: 'user', text: message });
      this.userMessage = '';
    }

    const params = {
      botId: 'R1IUX7JD6R',
      botAliasId: 'OEURJYS6EG',
      localeId: 'en_US',
      sessionId: this.sessionId,
      text: message,
    };

    console.log('Sending message to Lex:', params);

    const request = {
      botId: params.botId,
      botAliasId: params.botAliasId,
      localeId: params.localeId,
      sessionId: params.sessionId,
      text: params.text
    };

    this.lexRuntimeV2.recognizeText(request, (err, data) => {
      if (err) {
        console.error('Error from Lex:', err);
        this.messages.push({ sender: 'bot', text: 'Sorry, something went wrong.' });
      } else {
        console.log('Response from Lex:', data);
        if (data.messages && data.messages.length > 0) {
          this.messages.push({ sender: 'bot', text: data.messages[0].content || 'No response from bot.' });
        } else {
          this.messages.push({ sender: 'bot', text: 'No response from bot.' });
        }
      }
    });
  }
}
