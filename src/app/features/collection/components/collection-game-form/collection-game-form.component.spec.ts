import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGameFormComponent } from './collection-game-form.component';

describe('CollectionGameFormComponent', () => {
  let component: CollectionGameFormComponent;
  let fixture: ComponentFixture<CollectionGameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionGameFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
