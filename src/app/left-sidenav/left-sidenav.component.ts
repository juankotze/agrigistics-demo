import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'left-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './left-sidenav.component.html',
  styleUrl: './left-sidenav.component.scss'
})
export class LeftSidenavComponent {
  protected readonly navLinks: NavLink[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      icon: 'home'
    },
    {
      path: 'payroll',
      label: 'Payroll',
      icon: 'home'
    },
    {
      path: 'reporting',
      label: 'Reporting',
      icon: 'home'
    },
    {
      path: 'employees',
      label: 'Employees',
      icon: 'home'
    },
    {
      path: 'settings',
      label: 'Settings',
      icon: 'home'
    }
  ];
}
