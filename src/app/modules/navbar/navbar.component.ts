import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {selectAuthUser} from "../../store/selectors/auth.selectors";
import {UserModel} from "../../store/models/user.model";
import {AuthService} from "../../services/auth.service";
import {LocalStorageService} from "../../utils/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  user$!: Observable<UserModel>; // Assuming User is your user model

  constructor(
    private store: Store,
              private router: Router,
              private localStorageService: LocalStorageService, public authService : AuthService) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectAuthUser));
  }
  logout() {
    this.authService.logout();
    this.localStorageService.delete('user');
    this.router.navigate(['/signin']);
  }
}
