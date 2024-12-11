import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationIconComponent } from './notification-icon.component';
import { SentinelNotificationTypeEnum } from '../model/sentinel-notification-type.enum';
import { LayoutCommonComponentsMaterialModule } from '../../../common-components/src/layout-common-components-material.module';

// Wrapper is needed to set a value of notification icon type due to errors with ngClass
@Component({
  selector: 'sentinel-notification-icon-test',
  template: '<sentinel-notification-icon [type]="type" [coloredIcon]="color"></sentinel-notification-icon>',
})
export class NotificationIconTestWrapperComponent {
  type: SentinelNotificationTypeEnum = SentinelNotificationTypeEnum.Error;
  color = true;
}

describe('NotificationIconComponent', () => {
  let wrapperComponent: NotificationIconTestWrapperComponent;
  let component: NotificationIconComponent;
  let wrapperFixture: ComponentFixture<NotificationIconTestWrapperComponent>;
  let fixture: ComponentFixture<NotificationIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule],
      declarations: [NotificationIconComponent, NotificationIconTestWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    wrapperFixture = TestBed.createComponent(NotificationIconTestWrapperComponent);
    fixture = TestBed.createComponent(NotificationIconComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(wrapperComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should have error icon on error type', (done) => {
    wrapperComponent.type = SentinelNotificationTypeEnum.Error;
    fixture.whenStable().then(() => {
      const result = fixture.debugElement.query(By.css('.error'));
      expect(result).toBeDefined();
      done();
    });
  });

  it('should have info icon on info type', (done) => {
    wrapperComponent.type = SentinelNotificationTypeEnum.Info;
    fixture.whenStable().then(() => {
      const result = fixture.debugElement.query(By.css('.info'));
      expect(result).toBeDefined();
      done();
    });
  });

  it('should have warning icon on warning type', (done) => {
    wrapperComponent.type = SentinelNotificationTypeEnum.Warning;
    fixture.whenStable().then(() => {
      const result = fixture.debugElement.query(By.css('.warning'));
      expect(result).toBeDefined();
      done();
    });
  });

  it('should have success icon on success type', (done) => {
    wrapperComponent.type = SentinelNotificationTypeEnum.Info;
    fixture.whenStable().then(() => {
      const result = fixture.debugElement.query(By.css('.success'));
      expect(result).toBeDefined();
      done();
    });
  });

  it('should have no colors icon on color false', (done) => {
    wrapperComponent.color = false;
    fixture.whenStable().then(() => {
      const result = fixture.debugElement.query(By.css('.none'));
      expect(result).toBeDefined();
      done();
    });
  });
});
