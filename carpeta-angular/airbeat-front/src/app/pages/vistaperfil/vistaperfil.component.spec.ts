import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaperfilComponent } from './vistaperfil.component';

describe('VistaperfilComponent', () => {
  let component: VistaperfilComponent;
  let fixture: ComponentFixture<VistaperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaperfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
