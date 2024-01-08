import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavviewbetaComponent } from './navviewbeta.component';

describe('NavviewbetaComponent', () => {
  let component: NavviewbetaComponent;
  let fixture: ComponentFixture<NavviewbetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavviewbetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavviewbetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
