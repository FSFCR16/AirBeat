import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPrincipalPageComponent } from './vista-principal-page.component';

describe('VistaPrincipalPageComponent', () => {
  let component: VistaPrincipalPageComponent;
  let fixture: ComponentFixture<VistaPrincipalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPrincipalPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaPrincipalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
