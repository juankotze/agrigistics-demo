import { computed, Injectable, signal } from '@angular/core';
import { Employee, IEmployee } from '../shared/models/employee.type';
import { MockDeductions, MockEmployee, MockPayrollData } from '../../assets/mock-data';
import { IDeduction, IDeductionsSummary, IPayrollItem, IPayrollSummary } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  // ===== State Signals =====
  private _employee = signal<IEmployee | undefined>(undefined);
  private _payrollItems = signal<IPayrollItem[]>([]);
  private _deductionTypes = signal<IDeduction[]>([]);

  readonly employee = this._employee.asReadonly() || signal<IEmployee>(new Employee());
  readonly payrollItems = this._payrollItems.asReadonly();

  // ===== Computed State Signals =====
  private readonly totalEarnings = computed(() => {
    return this._payrollItems().reduce((total, item) => total + (item.quantity * item.rate), 0);
  });

  private readonly deductions = computed<IDeduction[]>(() => {
    const payrollTotal = this.totalEarnings();
    return this._deductionTypes().map(deduction => ({
      ...deduction,
      amount: deduction.flatAmount ? deduction.flatAmount : (payrollTotal * (deduction.percentage / 100))
    }));
  });

  private readonly totalDeductions = computed(() => {
    return this.deductions().reduce((total, item) => total + item.amount, 0);
  });

  private readonly netTotal = computed(() => {
    return this.totalEarnings() - this.totalDeductions();
  });

  // ===== Public Computed Signals =====
  readonly overview = computed<IPayrollSummary>(() => {
    return {
      totalEarnings: this.totalEarnings(),
      totalDeductions: this.totalDeductions(),
      netPay: this.netTotal()
    };
  });

  readonly deductionsSummary = computed<IDeductionsSummary>(() => {
    return {
      deductions: this.deductions(),
      total: this.totalDeductions()
    };
  });

  constructor() { 
    this._employee.set(MockEmployee);
    this._payrollItems.set(MockPayrollData);
    this._deductionTypes.set(MockDeductions);
  }
}
