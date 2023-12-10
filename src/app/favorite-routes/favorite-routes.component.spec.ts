import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRoutesComponent } from './favorite-routes.component';

describe('FavoriteRoutesComponent', () => {
  let component: FavoriteRoutesComponent;
  let fixture: ComponentFixture<FavoriteRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteRoutesComponent]
    });
    fixture = TestBed.createComponent(FavoriteRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
