import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NotificationIconComponent } from '../notification-icon/notification-icon.component';
import { SentinelNotificationDetailComponent } from './sentinel-notification-detail.component';
import { SentinelNotification } from '../model/sentinel-notification';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { LayoutCommonComponentsMaterialModule } from '../../../common-components/src/layout-common-components-material.module';
import { SentinelPipesModule } from '@sentinel/common/pipes';

describe('NotificationDetailComponent', () => {
  let component: SentinelNotificationDetailComponent;
  let cd: ChangeDetectorRef;
  let fixture: ComponentFixture<SentinelNotificationDetailComponent>;
  const childComponents = [NotificationIconComponent];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule, RouterTestingModule, SentinelPipesModule],
      declarations: [SentinelNotificationDetailComponent, childComponents],
    })
      .overrideComponent(NotificationIconComponent, {
        set: {
          selector: 'sentinel-notification-icon',
          template: '',
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentinelNotificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have notification title', (done) => {
    const mockedNotification = mockNotification();
    component.notification$ = of(mockedNotification);
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('mat-card-title'));
      expect(title).toBeDefined();
      expect(title.nativeElement.childNodes.length).toBe(1);
      expect(title.nativeElement.firstChild.data.toLowerCase()).toContain(mockedNotification.title.toLocaleLowerCase());
      done();
    });
  });

  it('should have notification title', (done) => {
    const mockedNotification = mockNotification();
    component.notification$ = of(mockedNotification);
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('mat-card-title'));
      expect(title).toBeDefined();
      expect(title.nativeElement.childNodes.length).toBe(1);
      expect(title.nativeElement.firstChild.data.toLowerCase()).toContain(mockedNotification.title.toLocaleLowerCase());
      done();
    });
  });

  it('should have source subtitle', (done) => {
    const mockedNotification = mockNotification();
    component.notification$ = of(mockedNotification);
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const source = fixture.debugElement.queryAll(By.css('mat-card-subtitle'))[0];
      expect(source).toBeDefined();
      expect(source.nativeElement.childNodes.length).toBe(1);
      expect(source.nativeElement.firstChild.data.toLowerCase()).toContain(
        mockedNotification?.source?.toLocaleLowerCase(),
      );
      done();
    });
  });

  it('should have notification type', (done) => {
    const mockedNotification = mockNotification();
    component.notification$ = of(mockedNotification);
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const type = fixture.debugElement.queryAll(By.css('mat-card-subtitle'))[1];
      expect(type).toBeDefined();
      expect(type.nativeElement.childNodes.length).toBe(1);
      expect(type.nativeElement.firstChild.data.toLowerCase()).toContain(mockedNotification.type.toLocaleLowerCase());
      done();
    });
  });

  it('should have notification created at', (done) => {
    const mockedNotification = mockNotification();
    component.notification$ = of(mockedNotification);
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const created = fixture.debugElement.queryAll(By.css('mat-card-subtitle'))[2];
      expect(created).toBeDefined();
      expect(created.nativeElement.childNodes.length).toEqual(1);
      expect(created.nativeElement.firstChild.data.toLowerCase()).toContain(
        new Date(mockedNotification.timestamp ?? 0).getUTCFullYear(),
      );
      done();
    });
  });

  it('should have notification additional info', (done) => {
    const mockedNotification = mockNotification();
    component.notification$ = of(mockedNotification);
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const created = fixture.debugElement.query(By.css('mat-card-content'));
      expect(created).toBeDefined();
      expect(created.nativeElement.children.length).toEqual(mockedNotification.additionalInfo?.length);
      let notificationAdditionalInfoPrimary;
      if (mockedNotification.additionalInfo && mockedNotification.additionalInfo[0]) {
        notificationAdditionalInfoPrimary = mockedNotification.additionalInfo[0];
      }
      let notificationAdditionalInfoSecondary;
      if (mockedNotification.additionalInfo && mockedNotification.additionalInfo[1]) {
        notificationAdditionalInfoSecondary = mockedNotification.additionalInfo[1];
      }
      expect(created.nativeElement.children[0].textContent).toContain(notificationAdditionalInfoPrimary);
      expect(created.nativeElement.children[1].textContent).toContain(notificationAdditionalInfoSecondary);
      done();
    });
  });

  function mockNotification(): SentinelNotification {
    return {
      id: 1,
      title: 'This is a mock notification',
      type: SentinelNotificationTypeEnum.Info,
      source: 'test',
      additionalInfo: ['Some text', 'Next line of text'],
      timestamp: Date.UTC(2019, 1, 1),
    };
  }
});
