import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutCommonComponentsMaterialModule } from '../layout-common-components-material.module';
import { UserMenuComponent } from './user-menu.component';
import { UserCardComponent } from '../../../user-card/src/user-card.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  const childComponents = [UserCardComponent];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule],
      declarations: [UserMenuComponent, childComponents],
    })
      .overrideComponent(UserCardComponent, {
        set: {
          selector: 'sentinel-user-card',
          template: '',
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    component.user = {
      picture: '',
      name: 'Sentinel User',
      login: 'sentinel@sentinel.cz',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on login', () => {
    spyOn(component.login, 'emit');
    component.onLogin();
    expect(component.login.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit event on logout', () => {
    spyOn(component.logout, 'emit');
    component.onLogout();
    expect(component.logout.emit).toHaveBeenCalledTimes(1);
  });
});
