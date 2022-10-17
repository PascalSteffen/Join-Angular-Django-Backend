import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PushTaskComponent } from './push-task.component';

describe('PushTaskComponent', () => {
  let component: PushTaskComponent;
  let fixture: ComponentFixture<PushTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PushTaskComponent],
      imports: [HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PushTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
