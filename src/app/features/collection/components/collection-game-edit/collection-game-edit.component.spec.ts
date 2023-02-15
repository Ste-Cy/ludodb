import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGameEditComponent } from './collection-game-edit.component';

describe('CollectionGameEditComponent', () => {
  let component: CollectionGameEditComponent;
  let fixture: ComponentFixture<CollectionGameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionGameEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionGameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
