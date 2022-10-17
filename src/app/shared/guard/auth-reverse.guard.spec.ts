import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthReverseGuard } from './auth-reverse.guard';

describe('AuthReverseGuard', () => {
  let guard: AuthReverseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule]
    });
    guard = TestBed.inject(AuthReverseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
