import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavElementsComponent } from './nav-elements.component';

describe('NavElementsComponent', () => {
  let component: NavElementsComponent;
  let fixture: ComponentFixture<NavElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavElementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
