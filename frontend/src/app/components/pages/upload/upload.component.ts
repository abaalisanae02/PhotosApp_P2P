import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImagesService } from '../../../services/images.service';
import { Images } from '../../../shared/models/Images';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [UploadComponent,ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  uploadForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private imagesService: ImagesService) {
    this.uploadForm = this.formBuilder.group({
      image: '',
      photoname: '' 
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.uploadForm.invalid) return;

    const formData = new FormData();
    const imageControl = this.uploadForm.get('image');
    const imageFile = imageControl?.value; 
    if (!imageFile) return;
    formData.append('image', imageFile);

    const photoname = this.uploadForm.get('photoname')?.value; // Get the photo name from the form
    formData.append('photoname', photoname);
    console.log(formData);
    
    this.imagesService.uploadImage(formData).subscribe({
      next: () => { 
        this.imagesService.showUploadSuccessToast(); 
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        this.imagesService.showUploadErrorToast(); 
      }
    });
}
onFileSelected(event: any) {
  const file = event.target.files[0];
  this.uploadForm.patchValue({
    image: file
  });
}
}
