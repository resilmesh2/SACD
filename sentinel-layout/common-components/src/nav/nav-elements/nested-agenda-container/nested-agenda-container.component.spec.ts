import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedAgendaContainerComponent } from './nested-agenda-container.component';
import { AgendaContainer } from '../../../../../src/model/agenda-container';
import { AgendaElementComponent } from '../agenda-element/agenda-element.component';
import { SentinelPipesModule } from '@sentinel/common/pipes';

describe('NestedAgendaContainerComponent', () => {
  let component: NestedAgendaContainerComponent;
  let fixture: ComponentFixture<NestedAgendaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NestedAgendaContainerComponent],
      imports: [SentinelPipesModule],
    })
      .overrideComponent(AgendaElementComponent, {
        set: {
          selector: 'sentinel-agenda-element',
          template: '',
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedAgendaContainerComponent);
    component = fixture.componentInstance;
    component.agendaContainer = new AgendaContainer('test', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
