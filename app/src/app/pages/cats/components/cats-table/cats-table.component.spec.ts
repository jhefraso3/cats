import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsTableComponent } from './cats-table.component';

describe('CatsTableComponent', () => {
  let component: CatsTableComponent;
  let fixture: ComponentFixture<CatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
