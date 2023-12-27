import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPageComponent } from './buscador-page.component';

describe('BuscadorPageComponent', () => {
  let component: BuscadorPageComponent;
  let fixture: ComponentFixture<BuscadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
