import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutCommonComponentsMaterialModule } from '../layout-common-components-material.module';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule],
      declarations: [LoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
