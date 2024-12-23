import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingAuctionComponent } from './trending-auction.component';

describe('TrendingAuctionComponent', () => {
  let component: TrendingAuctionComponent;
  let fixture: ComponentFixture<TrendingAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingAuctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
