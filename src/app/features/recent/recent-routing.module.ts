import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentPage } from './recent.page';

const routes: Routes = [
  {
    path: '',
    component: RecentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentPageRoutingModule {}
