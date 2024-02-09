import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm: string = '';
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  searchAndNavigate() {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/home'], {
        queryParams: { searchTerm: this.searchTerm },
      });
    }
  }

  emitEvent() {
    this.searchEvent.emit('searchTerm');
  }
}
