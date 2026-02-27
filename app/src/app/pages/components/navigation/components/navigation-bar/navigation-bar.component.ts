import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

interface SidenavNode {
  name: string;
  icon: string;
  children?: SidenavNode[];
  routerLink?: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: false,
})
export class NavigationBarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  panelOpenState = false;

  appMedia!: Boolean;
  sidenavMode!: MatDrawerMode;
  sidenavClass!: string;
  isMenuOpen!: boolean;
  contentMargin!: number;
  marginClass!: string;
  isDarkTheme = false;
  router: Router = inject(Router);

  componentSelected!: {
    route: string;
    tooltip: string;
    name: string;
    icon: string;
  };

  private _transformer = (node: SidenavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  breakpointService = inject(BreakpointObserver)

  constructor() {
    const theme = localStorage.getItem('theme');
    this.isDarkTheme = theme === 'dark';
    this.applyTheme();
  }

  navigateRotue(route: string) {
    this.router.navigate([route]);
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.breakPointResponsive();
  }

  onToolbarMenuToggle() {
    if (this.appMedia) {
      this.sidenav.toggle();
      this.isMenuOpen = false;
      return;
    }

    this.sidenav.open();

    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.sidenavClass = 'menu-close';
      this.marginClass = 'margin-semiclose';
      this.contentMargin = 70;
    } else {
      this.sidenavClass = 'menu-open';
      this.marginClass = 'margin-open';
      this.contentMargin = 275;
    }
  }

  breakPointResponsive() {
    this.breakpointService
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result: { matches: any }) => {
        if (result.matches) {
          this.appMedia = false;
          this.sidenav.open();
          this.sidenavClass = 'menu-open';
          this.contentMargin = 275;
          this.sidenavMode = 'side';
          this.marginClass = 'margin-open';
          return;
        }
        this.appMedia = true;
        this.sidenav.close();
        this.sidenavMode = 'over';
        this.marginClass = 'margin-close';
        this.sidenavClass = 'menu-open';
      });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private applyTheme() {
    if (this.isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  buttonClick(component: {
    route: string;
    tooltip: string;
    name: string;
    icon: string;
  }) {
    this.componentSelected = component;
    this.router.navigate([component.route]);
  }
  
}
