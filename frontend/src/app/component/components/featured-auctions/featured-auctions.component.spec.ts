import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAuctionsComponent } from './featured-auctions.component';

describe('FeaturedAuctionsComponent', () => {
  let component: FeaturedAuctionsComponent;
  let fixture: ComponentFixture<FeaturedAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedAuctionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
