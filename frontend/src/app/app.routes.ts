import { Routes } from '@angular/router';
import { ShowComponent } from './components/pages/show/show.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UploadComponent } from './components/pages/upload/upload.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'show', component:ShowComponent},
    {path:'find/:searchTerm',component:ShowComponent},
    {path:'',component:LoginComponent},
    {path: 'upload', component:UploadComponent}
];
