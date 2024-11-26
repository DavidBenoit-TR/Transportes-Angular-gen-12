import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarcamionesComponent } from './listarcamiones.component';

describe('ListarcamionesComponent', () => {
  let component: ListarcamionesComponent;
  let fixture: ComponentFixture<ListarcamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarcamionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarcamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
