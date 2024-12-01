import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuctionsTableComponent } from './my-auctions-table.component';

describe('MyAuctionsTableComponent', () => {
  let component: MyAuctionsTableComponent;
  let fixture: ComponentFixture<MyAuctionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAuctionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAuctionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
