import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableColumnType } from '../../enums';
import { SortDirection } from '../../enums/sort-direction.enum';
import { SearchBoxComponent } from '../search-box';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBoxComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T> {
  protected currency: string = 'ZAR';
  readonly DataTableColumnType = DataTableColumnType;
  readonly SortDirection = SortDirection;

  private readonly defaultActions: IDataTableAction[] = [
    {
      icon: 'visibility',
      label: 'View',
      action: 'view',
      color: '#166983'
    },
    {
      icon: 'edit',
      label: 'Edit',
      action: 'edit',
      color: '#A5C757'
    },
    {
      icon: 'delete',
      label: 'Delete',
      action: 'delete',
      color: '#FF3D00'
    }
  ];

  config = input.required<IDataTableConfig<T>>();
  protected sortColumn = signal<keyof T & string | null>(null);
  protected sortDirection = signal<SortDirection>(SortDirection.None);
  columns = computed(() => this.config().columns);
  data = computed(() => this.config().data);
  showSearchBar = computed(() => !this.config().hideSearchBar);

  protected actions = computed(() => {
    const configActions = this.config().actions;
    if (!configActions) return this.defaultActions;
    
    // Map through provided actions and merge with defaults
    return configActions.map(action => {
      const defaultAction = this.defaultActions.find(def => def.action === action.action);
      if (!defaultAction) return action;
      
      return {
        ...defaultAction,
        ...action // Override defaults with provided values
      };
    });
  });

  protected searchQuery = signal('');
  outsideSearchQuery = input('');

  filteredData = computed(() => {
    const query = this.searchQuery().toLowerCase().trim() + this.outsideSearchQuery().toLowerCase().trim();
    let filteredResults = this.data();
    
    // Apply search filter
    if (query) {
      filteredResults = filteredResults.filter(item => {
        return this.columns().filter(col => !col.hide || !col.notSearchable).some(col => {
          const value = item[col.key];
          return value != null && value.toString().toLowerCase().includes(query);
        });
      });
    }

    // Apply sorting
    const sortCol = this.sortColumn();
    const sortDir = this.sortDirection();
    
    if (sortCol && sortDir !== SortDirection.None) {
      filteredResults = [...filteredResults].sort((a, b) => {
        const aVal = a[sortCol];
        const bVal = b[sortCol];
        
        if (aVal == null) return sortDir === SortDirection.Ascending ? 1 : -1;
        if (bVal == null) return sortDir === SortDirection.Ascending ? -1 : 1;
        
        const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === SortDirection.Ascending ? comparison : -comparison;
      });
    }

    return filteredResults;
  });

  protected getSortIcon(column: IDataTableColumn<T>): string {
    if (!column.sortable) return '';
    if (this.sortColumn() !== column.key) return 'sort';
    
    return this.sortDirection() === SortDirection.Ascending ? 'arrow_upward' : 'arrow_downward';
  }

  protected handleSort(column: IDataTableColumn<T>): void {
    if (!column.sortable) return;

    if (this.sortColumn() === column.key) {
      // Cycle through sort directions
      switch (this.sortDirection()) {
        case SortDirection.None:
          this.sortDirection.set(SortDirection.Ascending);
          break;
        case SortDirection.Ascending:
          this.sortDirection.set(SortDirection.Descending);
          break;
        case SortDirection.Descending:
          this.sortDirection.set(SortDirection.None);
          this.sortColumn.set(null);
          break;
      }
    } else {
      this.sortColumn.set(column.key);
      this.sortDirection.set(SortDirection.Ascending);
    }
  }

  protected hasActions(): boolean {
    return !!this.config().actions?.length;
  }

  constructor() {
  }

  asDate(value: unknown): Date {
    if (value instanceof Date) return value;
    if (typeof value === 'string') return new Date(value);
    if (typeof value === 'number') return new Date(value);
    return new Date(NaN);
  }

  asCurrency(value: unknown): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value);
    return 0;
  }

  asIconClass(value: unknown): string {
    if (typeof value === 'string') return value;
    return '';
  }
}
