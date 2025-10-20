declare interface IDataTableAction {
  action: 'view' | 'edit' | 'delete';
  label: string;
  icon?: string;
  color?: string;
}

declare interface IDataTableConfig<T> {
  columns: IDataTableColumn<T>[];
  data: T[];
  hideSearchBar: boolean;
  actions?: IDataTableAction[];
}

declare interface IDataTableColumn<T> {
  key: keyof T & string;
  header: string;
  hide?: boolean;
  sortable?: boolean;
  notSearchable?: boolean;
  width?: string;
  type?: DataTableColumnType;
  displayFn?: (value: T[keyof T], row: T) => string;
}


