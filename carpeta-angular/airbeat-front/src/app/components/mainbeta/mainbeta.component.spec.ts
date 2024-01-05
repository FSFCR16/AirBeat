import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbetaComponent } from './mainbeta.component';

describe('MainbetaComponent', () => {
  let component: MainbetaComponent;
  let fixture: ComponentFixture<MainbetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainbetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainbetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
