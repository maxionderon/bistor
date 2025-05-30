import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-select-item-rating',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './select-item-rating.component.html',
  styleUrl: './select-item-rating.component.css'
})
export class SelectItemRatingComponent implements OnInit {

  @Input("ItemRatings")
  itemRatings: Array<number>
  @Input("Icon")
  icon: IconDefinition;
  @Input("Disabled")
  disabled: boolean;
  @Output("SelectedItemRating")
  eventEmitter: EventEmitter<number>;

  selectedItemRating: string;

  

  constructor() {

    this.itemRatings = new Array<number>;
    this.icon = {} as IconDefinition;
    this.disabled = false;
    this.eventEmitter = new EventEmitter<number>();
    this.selectedItemRating = "";

  }

  ngOnInit(): void {
      
    this.selectedItemRating = String(this.itemRatings.at(0));
    this.eventEmitter.emit(Number.parseInt(this.selectedItemRating));

  }

  changedItemRating(): void {

    this.eventEmitter.emit(Number.parseInt(this.selectedItemRating));

  }

}
