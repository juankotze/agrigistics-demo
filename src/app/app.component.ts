import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidenavComponent } from "./left-sidenav";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'agrigistics-demo';
}
