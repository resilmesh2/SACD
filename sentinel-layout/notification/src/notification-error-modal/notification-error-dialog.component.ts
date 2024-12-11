import { ChangeDetectionStrategy, Component, computed, Inject, Optional, Signal, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { SentinelLayoutI18nService, SentinelNotificationCardI18n } from '@sentinel/layout/i18n';

/**
 * Dialog component displaying error notification
 */
@Component({
  selector: 'sentinel-notification-error-modal',
  templateUrl: './notification-error-dialog.component.html',
  styleUrls: ['./notification-error-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationErrorDialogComponent {
  i18n: Signal<SentinelNotificationCardI18n>;

  constructor(
    public dialogRef: MatDialogRef<NotificationErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SentinelNotification,
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelNotificationCardI18n = {
      source: 'Source',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig().notifications?.card ?? i18nFallback)
      : signal(i18nFallback);
  }

  /**
   * Closes the dialog
   */
  close(): void {
    this.dialogRef.close(SentinelNotificationResult.DISMISSED);
  }

  /**
   * Closes the dialog with confirmation of action
   */
  confirmAction(): void {
    this.dialogRef.close(SentinelNotificationResult.CONFIRMED);
  }
}
