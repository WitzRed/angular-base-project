import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForloopPageComponent } from './forloop-page.component';

describe('ForloopPageComponent', () => {
  let component: ForloopPageComponent;
  let fixture: ComponentFixture<ForloopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForloopPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForloopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
