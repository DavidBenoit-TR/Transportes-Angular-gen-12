import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarcamionComponent } from './insertarcamion.component';

describe('InsertarcamionComponent', () => {
  let component: InsertarcamionComponent;
  let fixture: ComponentFixture<InsertarcamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarcamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertarcamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
