import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-pdf-upload',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule, MatProgressBarModule, MatExpansionModule  
  ],
  templateUrl: './pdf-upload.component.html',
  styleUrl: './pdf-upload.component.css'
})
export class PdfUploadComponent {
    selectedFile: File | null = null;
    uploadProgress: number = 0;
    uploadError: string | null = null;
    requiredFileType: string | null = ".pdf";
    fileContent:any | null;
    constructor(private http: HttpClient) {}
  
    onFileSelected(event: any) {
      const file = event.target.files[0];
      this.uploadError = "";
      if (file) {
        if (file.type !== 'application/pdf') {
          this.uploadError = 'Please select a PDF file.';
          return;
        }

        const preview = (document.getElementById('preview') as HTMLFormElement);
        const reader = new FileReader();
        reader.onload = ((e:any) => {
          this.fileContent = reader.result;
        });
  
        reader.readAsText(file);
        preview['src'] = URL.createObjectURL(file);
        preview['width'] = "550";
        preview['height'] = "650";

        this.selectedFile = file;
      }
    }
  
    uploadFile() {
      //this.uploadProgress = 0;
      if (!this.selectedFile) {
        return;
      }
  
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.http.post('/api/upload', formData, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe((event:any) => {
        //console.log(event.total, event);
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload successful:', event.body);
          if(event.body['summary']){
            alert(event.body['summary']);
          }
          // Handle successful upload
        }
      }, error => {
        console.error('Upload error:', error);
        this.uploadError = 'An error occurred while uploading the file.';
      });
    }
  }
  
