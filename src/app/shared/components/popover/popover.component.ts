import { Component, Input, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(private popoverController: PopoverController) {}
  @Input() removeAll!: Function;
  ngOnInit() {}

  async confirmRemoveAll(confirm: boolean) {
    if (confirm) {
      await this.removeAll();
    }
    await this.popoverController.dismiss();
  }
}
