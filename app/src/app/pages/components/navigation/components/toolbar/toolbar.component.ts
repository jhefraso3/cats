import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: false
})
export class ToolbarComponent implements OnInit {
  @Input() toggle!: MatSidenav;
  @Output() emit = new EventEmitter();

  loginService = inject(LoginService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {}

  exit() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
