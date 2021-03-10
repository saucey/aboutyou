import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { GlobalModule } from 'src/app/common/global.module';
import { LocationReserveDialogComponent } from './location-reserve-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LocationReserveDialogComponent],
  imports: [GoogleMapsModule, GlobalModule, TranslateModule],
  entryComponents: [LocationReserveDialogComponent],
  exports: [LocationReserveDialogComponent],
  providers: [{ provide: 'mapsAPI', useValue: 'AIzaSyBEv1X-5NgxGv9f1XmebHiz0UAulBE4qPY' }],
})
export class LocationReservationDialogModule {}
