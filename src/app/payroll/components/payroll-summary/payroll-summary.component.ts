import { Component, computed, inject } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import { CardComponent, IOverviewCardItem, OverviewCardComponent } from "../../../shared";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'payroll-summary',
  standalone: true,
  imports: [CardComponent, OverviewCardComponent, CommonModule],
  templateUrl: './payroll-summary.component.html',
  styleUrl: './payroll-summary.component.scss'
})
export class PayrollSummaryComponent {
  private readonly payrollService = inject(PayrollService);

  private deductionsIconsMap: Record<string, string> = {
    'UIF': 'description',
    'PAYE': 'payments',
    // Add more mappings as needed
  };

  readonly employee = this.payrollService.employee!;
  readonly overview = this.payrollService.overview;
  readonly deductions = this.payrollService.deductionsSummary;

  overviewCardInfo = computed<IOverviewCardItem[]>(() => {
    const overview = this.overview();
    return [
      {
        label: 'Total Earnings',
        value: overview.totalEarnings,
        icon: 'trending_up',
        iconColor: '#FFFFFF',
        iconBackgroundColor: '#A5C757'
      } as IOverviewCardItem,
      {
        label: 'Total Deductions',
        value: overview.totalDeductions,
        icon: 'trending_down',
        iconColor: '#FFFFFF',
        iconBackgroundColor: '#FF3D00'
      } as IOverviewCardItem,
      {
        label: 'Net total',
        value: overview.netPay,
        icon: 'account_balance',
        iconColor: '#FFFFFF',
        iconBackgroundColor: '#166983'
      } as IOverviewCardItem
    ] as IOverviewCardItem[]
  });

  deductionsCardInfo = computed<IOverviewCardItem[]>(() => {
    const deductions: IOverviewCardItem[] = this.deductions().deductions.map(deduction => ({
      label: deduction.type,
      value: deduction.amount,
      icon: this.deductionsIconsMap[deduction.type] || 'bi-dash-circle',
      iconColor: '#7A9933',
      iconBackgroundColor: '#F5F9EC'
    }) as IOverviewCardItem) as IOverviewCardItem[];
    const totalDeductionItem: IOverviewCardItem = {
      label: 'Total Deductions',
      value: this.deductions().total,
      icon: 'point_of_sale',
      iconColor: '#7A9933',
      iconBackgroundColor: '#F5F9EC'
    };
    return [...deductions, totalDeductionItem];
  });

}
