import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdminPageComponent } from './vista-admin-page.component';

describe('VistaAdminPageComponent', () => {
  let component: VistaAdminPageComponent;
  let fixture: ComponentFixture<VistaAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaAdminPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
