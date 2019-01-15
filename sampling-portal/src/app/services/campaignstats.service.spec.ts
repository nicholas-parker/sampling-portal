import { TestBed } from '@angular/core/testing';

import { CampaignstatsService } from './campaignstats.service';

describe('CampaignstatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampaignstatsService = TestBed.get(CampaignstatsService);
    expect(service).toBeTruthy();
  });
});
