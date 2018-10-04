import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MockDataService} from '../shared/services/mock-data.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {

  public data;
  private allItems = [];
  @ViewChild('container') container: ElementRef;
  @ViewChildren('flexItem') items: QueryList<ElementRef>;

  constructor(public mockData: MockDataService) {
  }

  ngOnInit() {
    this.data = this.mockData.data.items.filter( item => item.cardType === 'doc');
  }

  ngAfterViewInit() {
    this.allItems = this.items.map(item => item.nativeElement);
  }

  onResize(event) {
    this.resizeAllGridItems();
  }

  resizeGridItem(item) {
    const grid = this.container.nativeElement;
    const rowHeight = Number.parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = Number.parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllGridItems() {
    for (let x = 0; x < this.allItems.length; x++) {
      this.resizeGridItem(this.allItems[x]);
    }
  }
}
