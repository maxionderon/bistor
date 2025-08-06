import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input("NumberOfPages")
  public numberOfPages: number;

  protected selectedPage: number;

  private pages: Map<number, boolean>;

  @Output("SelectedPage")
  private eventEmitter: EventEmitter<number>

  constructor() {

    this.numberOfPages = 0;
    this.selectedPage = 1;
    this.pages = new Map<number, boolean>();
    this.eventEmitter = new EventEmitter<number>();

  }

  ngOnInit(): void {
      
    this.buildPages();

  }

  ngOnChanges(changes: SimpleChanges): void {
      
    this.buildPages();

  }

  protected nextPage(): void {

    this.pages.set(this.selectedPage, false);
    this.selectedPage = this.selectedPage + 1;
    this.pages.set(this.selectedPage, true);
    this.eventEmitter.emit(this.selectedPage);

  }

  protected previousPage(): void {

    this.pages.set(this.selectedPage, false);
    this.selectedPage = this.selectedPage - 1;
    this.pages.set(this.selectedPage, true);
    this.eventEmitter.emit(this.selectedPage);

  }

  protected selectPage(selectedPage: number): void {

    this.pages.set(this.selectedPage, false);
    this.selectedPage = selectedPage;
    this.pages.set(this.selectedPage, true);
    this.eventEmitter.emit(this.selectedPage);

  }

  private buildPages(): void {

    this.pages = new Map<number, boolean>();

    for(let i: number = 0; i != this.numberOfPages; i = i + 1) {

      this.pages.set(i + 1, false);

    }

    this.pages.set(this.selectedPage, true);

  }

  protected getNumbers(): Array<number> {

    let numbers: Array<number>;

    numbers = Array.from(this.pages.keys());
    numbers.sort( (a, b) => { return a - b });

    return numbers;

  }

  protected writeAriaLabel(page: number): string {

    return "Goto page " + String(page);

  }

  protected getIsSelected(page: number): boolean {

    return this.pages.get(page) as boolean;

  }

  protected previousDisabled(): boolean {

    if( this.selectedPage == 1 ) {

      return true;

    }

    return false;

  }

  protected nextDisabled(): boolean {

    if( this.selectedPage == this.numberOfPages ) {

      return true;

    }

    return false;

  }

}
