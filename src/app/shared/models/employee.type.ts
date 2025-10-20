export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  fullName?: string;
}

export class Employee implements IEmployee {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  position: string = '';
  team: string = '';

  constructor(employee?: Partial<IEmployee>) {
    if (employee) {
      Object.assign(this, employee);
    }
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  
}