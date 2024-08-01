import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';

interface Message {
  sender: string;
  content: string;
}

interface Answer {
  answer : string;
}

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatButtonModule,
    MatIconModule, MatProgressBarModule, MatExpansionModule],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  messages: Message[] = [];
  newMessage = 'Enter prompt';
  waiting: boolean = false;
  placeHolderText = 'Enter prompt';
  constructor(private http: HttpClient) { }

  sendMessage(type:number) {
    this.waiting = true;
    var question = this.newMessage;
   // alert(type);
    if (this.newMessage.trim() !== '') {
      this.messages.push({ sender: 'User', content: this.newMessage });
      this.newMessage = '';      
    }

    var url:string='';
    if(type == 1){
      url = '/api/ask';
    } else if (type == 2) {
      url = '/api/ask-pdf';
    }
    const params = new HttpParams().set('question', question);
    this.http.get(url, {
      params
    }).subscribe({
      next: (data: any) => {
        if(data['answer']){
          const answer = data['answer'];
          this.messages.push({ sender: 'Admin', content: answer});
        } else {
          console.log(data);
          this.messages.push({ sender: 'Admin', content: 'I do not know the answer. I am not trained to give that away'});
        }
        this.waiting = false;
      },
      error: error => {
        //this.errorMessage = error.message;
        this.messages.push({ sender: 'Admin', content: 'I do not know the answer. I am not trained to give that away'});
        console.error('There was an error!', error);
        this.waiting = false;
      }      
    });
  }

  clearChat() {
    this.messages = [];
  }
}