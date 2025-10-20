import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActionItem {
  id: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'payroll-right-side-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll-right-side-actions.component.html',
  styleUrl: './payroll-right-side-actions.component.scss'
})
export class PayrollRightSideActionsComponent {
  @Output() actionSelected = new EventEmitter<string>();

  protected readonly actions: ActionItem[] = [
    {
      id: 'primary',
      icon: 'school',
      label: 'Action 1'
    },
    {
      id: 'secondary',
      icon: 'school',
      label: 'Action 2'
    }
  ];

  protected onAction(actionId: string): void {
    this.actionSelected.emit(actionId);
  }
}
