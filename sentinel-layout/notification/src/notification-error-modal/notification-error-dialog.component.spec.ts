import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NotificationErrorDialogComponent } from './notification-error-dialog.component';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { SentinelNotificationResult } from '../model/sentinel-notification-result.enum';
import { LayoutCommonComponentsMaterialModule } from '../../../common-components/src/layout-common-components-material.module';

describe('NotificationErrorModalComponent', () => {
  let component: NotificationErrorDialogComponent;
  let fixture: ComponentFixture<NotificationErrorDialogComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialogRef<NotificationErrorDialogComponent>>;

  const notification: SentinelNotification = {
    title: 'Test Notification',
    type: SentinelNotificationTypeEnum.Error,
    additionalInfo: ['abcde'],
    action: 'retry',
    source: 'test',
  };

  beforeEach(waitForAsync(() => {
    dialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule],
      declarations: [NotificationErrorDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogSpy },
        { provide: MAT_DIALOG_DATA, useValue: notification },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close with dismissed result on closed', () => {
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalledTimes(1);
    expect(component.dialogRef.close).toHaveBeenCalledWith(SentinelNotificationResult.DISMISSED);
  });

  it('should close with confirmed result on confirm action', () => {
    component.confirmAction();
    expect(component.dialogRef.close).toHaveBeenCalledTimes(1);
    expect(component.dialogRef.close).toHaveBeenCalledWith(SentinelNotificationResult.CONFIRMED);
  });

  it('should display possible action', (done) => {
    fixture.whenStable().then(() => {
      const result = fixture.debugElement.queryAll(By.css('button'));
      expect(result.length).toBe(2);
      expect(result[1].nativeElement.textContent.trim().toLowerCase()).toEqual(notification?.action?.toLowerCase());
      done();
    });
  });
});
