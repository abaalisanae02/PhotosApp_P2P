import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginComponent,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  constructor(private formBuilder:FormBuilder, private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router){}

  ngOnInit():void{
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });

    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted=true;
    if(this.loginForm.invalid) return;
    
    this.userService.login({username:this.fc['username'].value,password:this.fc['password'].value}).subscribe(()=>{
         this.router.navigateByUrl('/home');
  });
}

}
