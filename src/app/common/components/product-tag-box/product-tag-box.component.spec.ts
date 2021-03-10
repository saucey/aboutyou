/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTagBoxComponent } from './product-tag-box.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('ProductTagBoxComponent', () => {
  let component: ProductTagBoxComponent;
  let fixture: ComponentFixture<ProductTagBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ProductTagBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
