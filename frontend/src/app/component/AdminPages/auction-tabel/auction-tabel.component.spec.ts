import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTabelComponent } from './auction-tabel.component';

describe('AuctionTabelComponent', () => {
  let component: AuctionTabelComponent;
  let fixture: ComponentFixture<AuctionTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionTabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
