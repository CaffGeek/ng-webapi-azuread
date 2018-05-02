import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EveryoneComponent } from './everyone.component';

describe('EveryoneComponent', () => {
  let component: EveryoneComponent;
  let fixture: ComponentFixture<EveryoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveryoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EveryoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
