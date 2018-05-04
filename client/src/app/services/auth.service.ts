import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'
import { User } from '../models';

@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}

    constructor(private http: HttpClient) {
        if (localStorage.getItem('accessToken')) {
            this.loggedIn.next(true);
        } else {
            this.loggedIn.next(false);
        }
    }
    login(email: string, password: string) {
        return this.http.post<any>('/api/user/login', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.data && user.data.accessToken) {
                    this.loggedIn.next(true);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('accessToken', user.data.accessToken);
                }
                return user;
            });
    }
    register(user: User) {
        return this.http.post('/api/user/register', user);
    }
    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('accessToken');
    }
    get isLoggedIn() {
        return this.loggedIn;
    }
}