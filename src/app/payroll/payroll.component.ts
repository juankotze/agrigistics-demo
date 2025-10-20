import { Component, inject } from '@angular/core';
import { PayrollService } from './payroll.service';
import { PayrollRightSideActionsComponent, PayrollSummaryComponent, PayrollTableComponent } from "./components";

@Component({
  selector: 'payroll',
  standalone: true,
  imports: [PayrollSummaryComponent, PayrollTableComponent, PayrollRightSideActionsComponent],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent {
  private readonly payrollService = inject(PayrollService);

  protected handleAction(action: string): void {
    // Handle the action based on the type
    switch (action) {
      case 'primary':
        console.log('Primary action clicked');
        break;
      case 'secondary':
        console.log('Secondary action clicked');
        break;
      case 'education':
        console.log('Education action clicked');
        break;
    }
  }
}
