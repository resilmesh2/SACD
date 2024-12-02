import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationIconComponent } from '../notification-icon/notification-icon.component';
import { NotificationCardComponent } from './notification-card.component';
import { LayoutCommonComponentsMaterialModule } from '../../../common-components/src/layout-common-components-material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotificationCardComponent', () => {
  let component: NotificationCardComponent;
  let fixture: ComponentFixture<NotificationCardComponent>;
  let cd: ChangeDetectorRef;
  const childComponents = [NotificationIconComponent];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule, RouterTestingModule],
      declarations: [NotificationCardComponent, childComponents],
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
    fixture = TestBed.createComponent(NotificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default length values', (done) => {
    fixture.whenStable().then(() => {
      expect(component.titleMaxLength).toEqual(component.TITLE_MAX_LENGTH);
      expect(component.additionalInfoMaxLength).toEqual(component.INFO_MAX_LENGTH);
      done();
    });
  });

  it('should have length values for detailed mode', (done) => {
    component.detailed = true;
    component['setLengthValues']();
    fixture.whenStable().then(() => {
      expect(component.titleMaxLength).toEqual(component.DETAILED_TITLE_MAX_LENGTH);
      expect(component.additionalInfoMaxLength).toEqual(component.DETAILED_INFO_MAX_LENGTH);
      done();
    });
  });

  it('should have compact mode css by default', (done) => {
    fixture.whenStable().then(() => {
      const card = fixture.debugElement.query(By.css('.compact'));
      expect(card).toBeDefined();
      done();
    });
  });

  it('should not have compact mode css in detailed mode', (done) => {
    component.detailed = true;
    cd.detectChanges();
    fixture.whenStable().then(() => {
      const card = fixture.debugElement.query(By.css('.compact'));
      expect(card).toBeFalsy();
      done();
    });
  });
});
