import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaElementComponent } from './agenda-element.component';
import { Agenda } from '../../../../../src/model/agenda';
import { SentinelPipesModule } from '@sentinel/common/pipes';

describe('AgendaElementComponent', () => {
  let component: AgendaElementComponent;
  let fixture: ComponentFixture<AgendaElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaElementComponent],
      imports: [SentinelPipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaElementComponent);
    component = fixture.componentInstance;
    component.agenda = new Agenda('test', 'test');
    component.maxElementNameLength = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
