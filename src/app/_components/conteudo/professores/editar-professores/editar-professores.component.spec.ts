import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfessoresComponent } from './editar-professores.component';

describe('EditarProfessoresComponent', () => {
  let component: EditarProfessoresComponent;
  let fixture: ComponentFixture<EditarProfessoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProfessoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProfessoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
