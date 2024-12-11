import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RootAgendaContainerComponent } from './root-agenda-container.component';
import { AgendaContainer } from '../../../../../src/model/agenda-container';
import { AgendaElementComponent } from '../agenda-element/agenda-element.component';
import { NestedAgendaContainerComponent } from '../nested-agenda-container/nested-agenda-container.component';
import { SentinelPipesModule } from '@sentinel/common/pipes';

describe('RootAgendaContainerComponent', () => {
  let component: RootAgendaContainerComponent;
  let fixture: ComponentFixture<RootAgendaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootAgendaContainerComponent],
      imports: [SentinelPipesModule],
    })
      .overrideComponent(AgendaElementComponent, {
        set: {
          selector: 'sentinel-agenda-element',
          template: '',
        },
      })
      .overrideComponent(NestedAgendaContainerComponent, {
        set: {
          selector: 'sentinel-nested-agenda-container',
          template: '',
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootAgendaContainerComponent);
    component = fixture.componentInstance;
    component.rootAgendaContainer = new AgendaContainer('test', []);
    component.maxElementNameLength = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
