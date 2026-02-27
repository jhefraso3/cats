import { Component, OnInit } from '@angular/core';
import { User } from '../type/user.type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-view',
  standalone: false,
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent implements OnInit{
  user!: User | null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserProfile();
  }
}
