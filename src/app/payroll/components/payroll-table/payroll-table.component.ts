import { Component, computed, inject, signal } from '@angular/core';
import { CardComponent, DataTableColumnType, DataTableComponent, IPayrollItem, SearchBoxComponent } from '../../../shared';
import { PayrollService } from '../../payroll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'payroll-table',
  standalone: true,
  imports: [ CommonModule, CardComponent, DataTableComponent, SearchBoxComponent ],
  templateUrl: './payroll-table.component.html',
  styleUrl: './payroll-table.component.scss'
})
export class PayrollTableComponent {
  private readonly payrollService = inject(PayrollService);

  readonly payrollItems = this.payrollService.payrollItems;

  protected columns: IDataTableColumn<IPayrollItem>[] = [
      { key: 'id', header: 'ID', hide: true, notSearchable: true },
      { key: 'important', header: '', width: '5%', notSearchable: true, type: DataTableColumnType.icon, displayFn: (value) => value ? 'error' : '' },
      { key: 'name', header: 'Name', type: DataTableColumnType.text, sortable: true },
      { key: 'description', header: 'Description', type: DataTableColumnType.text, sortable: true },
      { key: 'type', header: 'Type', type: DataTableColumnType.text, sortable: true },
      { key: 'quantity', header: 'Quantity', type: DataTableColumnType.number, sortable: true },
      { key: 'rate', header: 'Rate', type: DataTableColumnType.currency, sortable: true },
    ];

  protected tableConfig: IDataTableConfig<IPayrollItem> = {
    columns: this.columns,
    data: this.payrollItems(),
    hideSearchBar: true,
    actions: [
      { action: 'view', label: 'View payroll item' },
      { action: 'edit', label: 'Edit payroll item' },
      { action: 'delete', label: 'Delete payroll item' }
    ]
  };

  searchQuery = signal('');

}
