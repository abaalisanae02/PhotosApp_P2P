import { Injectable } from '@angular/core';
import { Images } from '../shared/models/Images';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image_Upload_URL, Images_By_Search_URL, Images_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient,private toastrService: ToastrService) { }
  getAll(): Observable<Images[]>{
    return this.http.get<Images[]>(Images_URL);
  }
  getAllImagesBySearchTerm(searchTerm:string){
    return this.http.get<Images[]> (Images_By_Search_URL + searchTerm);
}
  showUploadSuccessToast() {
    this.toastrService.success('Upload Successful', 'Success');
    
}
showUploadErrorToast() {
  this.toastrService.error('Error uploading image', 'Error');
}
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(Image_Upload_URL, formData);
}
}
