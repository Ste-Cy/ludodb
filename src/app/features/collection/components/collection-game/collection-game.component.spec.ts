import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGameComponent } from './collection-game.component';

describe('CollectionGameComponent', () => {
  let component: CollectionGameComponent;
  let fixture: ComponentFixture<CollectionGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
