import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbetaComponent } from './viewbeta.component';

describe('ViewbetaComponent', () => {
  let component: ViewbetaComponent;
  let fixture: ComponentFixture<ViewbetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewbetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewbetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
