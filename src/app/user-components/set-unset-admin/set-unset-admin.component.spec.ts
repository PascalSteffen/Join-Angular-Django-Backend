import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SetUnsetAdminComponent } from './set-unset-admin.component';

describe('SetUnsetAdminComponent', () => {
  let component: SetUnsetAdminComponent;
  let fixture: ComponentFixture<SetUnsetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetUnsetAdminComponent],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetUnsetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
