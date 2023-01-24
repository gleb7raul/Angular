import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
})
export class LoadMoreComponent implements OnInit {
  @Input() isShowLoadButton: boolean | undefined;

  @Output()
  loadMore: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  load(): void {
    this.loadMore.emit(true);
  }
}
