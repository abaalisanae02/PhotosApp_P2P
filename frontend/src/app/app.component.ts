import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowComponent } from './components/pages/show/show.component';
import { UploadComponent } from './components/pages/upload/upload.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShowComponent,UploadComponent,HomeComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
