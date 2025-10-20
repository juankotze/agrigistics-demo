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
      label: 'Item 1',
      icon: 'home'
    },
    {
      path: 'payroll',
      label: 'Item 2',
      icon: 'home'
    },
    {
      path: 'employees',
      label: 'Item 3',
      icon: 'home'
    },
    {
      path: 'settings',
      label: 'Item 4',
      icon: 'home'
    }
  ];
}
