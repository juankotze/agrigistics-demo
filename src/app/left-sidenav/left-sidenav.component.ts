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
      icon: 'dashboard'
    },
    {
      path: 'payroll',
      label: 'Payroll',
      icon: 'payments'
    },
    {
      path: 'employees',
      label: 'Employees',
      icon: 'group'
    },
    {
      path: 'settings',
      label: 'Settings',
      icon: 'settings'
    }
  ];
}
