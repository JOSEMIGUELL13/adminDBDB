import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMembresiasComponent } from './lista-membresias.component';

describe('ListaMembresiasComponent', () => {
  let component: ListaMembresiasComponent;
  let fixture: ComponentFixture<ListaMembresiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMembresiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMembresiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
