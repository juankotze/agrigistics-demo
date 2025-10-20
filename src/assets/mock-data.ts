import { Employee } from "../app/shared/models/employee.type";
import { IDeduction, IPayrollItem } from "../app/shared/models/payroll.type";

export const MockEmployee = new Employee(
    {id: 'E006',
    firstName: 'Hannah',
    lastName: 'Smoterich-Barr Jip',
    position: 'Assembler',
    team: 'General Worker'}
);

export const MockPayrollData2: IPayrollItem[] = [
    { id: 1, name: 'Drafting', description: 'Description for Payroll Item 1', type: 'Type A', quantity: 10, rate: 15.5, important: true },
    { id: 2, name: 'Driving', description: '..', type: 'Type B', quantity: 5, rate: 20.0 },
    { id: 3, name: 'Payroll Item 3', description: 'Description for Payroll Item 3', type: 'Type A', quantity: 8, rate: 12.75, important: true },
    { id: 4, name: 'Payroll Item 4', description: 'Description for Payroll Item 4', type: 'Type C', quantity: 15, rate: 18.0 },
    { id: 5, name: 'Payroll Item 5', description: 'Description for Payroll Item 5', type: 'Type B', quantity: 12, rate: 22.5, important: true },
]

export const MockDeductions: IDeduction[] = [
    { type: 'UIF', percentage: 1.0, amount: 0 },
    { type: 'PAYE', percentage: 0, amount: 0 },
]

// Load and convert payroll data from JSON asset
import payrollJsonData from './payroll-data.json';
export const MockPayrollData: IPayrollItem[] = (payrollJsonData as any[]).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    type: item.type,
    quantity: item.quantity,
    rate: item.rate,
    important: !!item.important
}));