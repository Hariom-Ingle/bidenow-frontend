import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyauctionDetailsComponent } from './myauction-details.component';

describe('MyauctionDetailsComponent', () => {
  let component: MyauctionDetailsComponent;
  let fixture: ComponentFixture<MyauctionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyauctionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyauctionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
