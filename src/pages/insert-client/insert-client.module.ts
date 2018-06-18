import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertClientPage } from './insert-client';

@NgModule({
  declarations: [
    InsertClientPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertClientPage),
  ],
})
export class InsertClientPageModule {}
