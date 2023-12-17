import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoutesComponent } from './my-routes.component';

describe('MyRoutesComponent', () => {
  let component: MyRoutesComponent;
  let fixture: ComponentFixture<MyRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRoutesComponent]
    });
    fixture = TestBed.createComponent(MyRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
