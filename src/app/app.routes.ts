import { Routes } from '@angular/router';
import { PayrollComponent } from './payroll';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'payroll',
        pathMatch: 'full'
    },
    {
        path: 'payroll',
        component: PayrollComponent
    },
    {
        path: 'reporting',
        loadComponent: () => import('./reporting/reporting.component').then(m => m.ReportingComponent)
    }
];
