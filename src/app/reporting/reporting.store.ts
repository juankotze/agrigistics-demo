import { computed, inject, Injectable, signal } from '@angular/core';
import { ReportingService } from './reporting.service';
import { IClockingResponse } from '../shared/models/clocking.type';

@Injectable({
  providedIn: 'root',
})
export class ReportingStore {
  private readonly reportingService = inject(ReportingService);

  // State
  private _employees = signal<any[]>([]);
  private _clockingData = signal<IClockingResponse[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Selectors (read-only computed values)
  readonly clockingData = computed(() => this._clockingData());
  readonly employees = computed(() => this._employees());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  // Actions (methods components can call)
  loadClockingData(): void {
    this._loading.set(true);
    this._error.set(null);

    this.reportingService.fetchReportData().subscribe({
      next: (data) => {
        this._clockingData.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  refreshData(): void {
    this.loadClockingData();
  }
}
