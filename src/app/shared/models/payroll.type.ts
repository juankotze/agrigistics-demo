export interface IPayrollItem {
  id: number;
  name: string;
  description: string;
  type: string;
  quantity: number;
  rate: number;
  important?: boolean;
}

export interface IPayrollSummary {
  totalEarnings: number;
  totalDeductions: number;
  netPay: number;
}

export interface IDeduction {
  type: string;
  percentage: number;
  flatAmount?: number;
  amount: number;
}

export interface IDeductionsSummary {
  deductions: IDeduction[];
  total: number;
}