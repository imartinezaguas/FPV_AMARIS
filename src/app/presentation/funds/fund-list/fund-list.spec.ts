import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundList } from './fund-list';

describe('FundList', () => {
  let component: FundList;
  let fixture: ComponentFixture<FundList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
