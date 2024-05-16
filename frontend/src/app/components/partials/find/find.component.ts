import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find',
  standalone: true,
  imports: [],
  templateUrl: './find.component.html',
  styleUrl: './find.component.css'
})
export class FindComponent implements OnInit{
  searchTerm='';
  constructor(activatedRoute:ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params)=>{
    if(params['searchTerm'])
      this.searchTerm =params['searchTerm'];

  }
   );

  }
  ngOnInit(): void {
    
  }

  find(term:string):void{
    if(term)
      this.router.navigateByUrl('/find/'+term);
  }

}
