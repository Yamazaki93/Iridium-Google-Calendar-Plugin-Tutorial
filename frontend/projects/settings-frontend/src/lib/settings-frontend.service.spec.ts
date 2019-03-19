import { TestBed } from '@angular/core/testing';

import { SettingsFrontendService } from './settings-frontend.service';

describe('SettingsFrontendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsFrontendService = TestBed.get(SettingsFrontendService);
    expect(service).toBeTruthy();
  });
});
