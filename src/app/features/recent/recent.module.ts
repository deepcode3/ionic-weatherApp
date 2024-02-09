import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecentPage } from './recent.page';

import { RecentPageRoutingModule } from './recent-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RecentPageRoutingModule],
  declarations: [RecentPage],
})
export class RecentPageModule {}
