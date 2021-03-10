import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { NotFoundComponent } from 'src/app/pages/404/404.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [GlobalModule, TranslateModule],
})
export class NotFoundModule {}
