import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUsuarioPageComponent } from './vista-usuario-page.component';

describe('VistaUsuarioPageComponent', () => {
  let component: VistaUsuarioPageComponent;
  let fixture: ComponentFixture<VistaUsuarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaUsuarioPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaUsuarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
