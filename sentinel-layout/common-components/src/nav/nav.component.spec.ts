import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutCommonComponentsMaterialModule } from '../layout-common-components-material.module';
import { NavComponent } from './nav.component';
import { Agenda } from '../../../src/model/agenda';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule, RouterTestingModule],
      declarations: [NavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    component.agendaContainers = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit even when agenda selected', () => {
    const agenda = new Agenda('Test Agenda', 'home');
    spyOn(component.agendaSelected, 'emit');
    component.onAgendaSelected(agenda);
    expect(component.agendaSelected.emit).toHaveBeenCalledTimes(1);
    expect(component.agendaSelected.emit).toHaveBeenCalledWith(agenda);
  });
});
