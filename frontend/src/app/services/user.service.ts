import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { User_Login_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

const User_Key='User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient, 
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(User_Login_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            'Welcome to Photosapp ' + user.name + ' !',
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse, 'Login Failed');
        }
      })
    );
  }

  private setUserToLocalStorage(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(User_Key, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(User_Key);
      if (userJson) return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
