import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatPanelComponent} from './chat-panel/chat-panel.component';
import { PdfUploadComponent } from "./pdf-upload/pdf-upload.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatPanelComponent, PdfUploadComponent, MatButtonModule,
    MatIconModule, MatProgressBarModule, MatExpansionModule  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-bot';  
}
