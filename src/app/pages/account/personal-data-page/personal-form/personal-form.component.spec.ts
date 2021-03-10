import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { PersonalFormComponent } from './personal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalModule } from 'src/app/common/global.module';

describe('PersonalFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingWithLocalizationModule,
        FormsModule,
        ReactiveFormsModule,
        GlobalModule,
      ],
      declarations: [PersonalFormComponent],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PersonalFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
