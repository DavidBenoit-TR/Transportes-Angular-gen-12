import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcamionComponent } from './editarcamion.component';

describe('EditarcamionComponent', () => {
  let component: EditarcamionComponent;
  let fixture: ComponentFixture<EditarcamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarcamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarcamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
