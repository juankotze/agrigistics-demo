import { Component, inject, OnInit } from '@angular/core';
import { GeoclockMapComponent } from "./components";
import { ReportingStore } from './reporting.store';

@Component({
  selector: 'app-reporting',
  imports: [GeoclockMapComponent],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss'
})
export class ReportingComponent implements OnInit {
  private readonly reportStore = inject(ReportingStore);

  ngOnInit(): void {
  }
}
