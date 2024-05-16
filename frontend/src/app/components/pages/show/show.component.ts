import { Component, OnInit } from '@angular/core';
import { Images } from '../../../shared/models/Images';
import { ImagesService } from '../../../services/images.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { FindComponent } from '../../partials/find/find.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [RouterLink,NgFor, FindComponent ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent  implements OnInit{
  images: Images[]=[];
  constructor(private imagesService: ImagesService, activatedRoute: ActivatedRoute){
    let imagesObservable: Observable<Images[]>;
    activatedRoute.params.subscribe((params)=>{
      if (params['searchTerm'])
        imagesObservable=this.imagesService.getAllImagesBySearchTerm(params['searchTerm']);
      else
      imagesObservable= imagesService.getAll();
      imagesObservable.subscribe((myserver)=>{
        this.images=myserver;
      })
    })
    

  }
  
  ngOnInit(): void {}

  getImageUrl(image: Images): string {
    return `data:${image.contentType};base64,${image.data}`;
  }
}
