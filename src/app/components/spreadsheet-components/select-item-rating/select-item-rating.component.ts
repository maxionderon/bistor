
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-select-item-rating',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './select-item-rating.component.html',
  styleUrl: './select-item-rating.component.css'
})
export class SelectItemRatingComponent implements OnInit {

  @Input("DefaultItemRating")
  defaultItemRating: number;
  @Input("ItemRatings")
  itemRatings: Array<number>
  @Input("Icon")
  icon: IconDefinition;
  @Input("Disabled")
  disabled: boolean;
  @Output("SelectedItemRating")
  eventEmitter: EventEmitter<number>;

  selectedItemRating: number;

  

  constructor() {

    this.defaultItemRating = 0;
    this.itemRatings = new Array<number>();
    this.icon = {} as IconDefinition;
    this.disabled = false;
    this.eventEmitter = new EventEmitter<number>();
    this.selectedItemRating = 0;

  }

  ngOnInit(): void {
    
    if(this.defaultItemRating == 0) {
    
      this.selectedItemRating = this.itemRatings.at(0) as number;
    
    } else {
    
      this.selectedItemRating = this.defaultItemRating;
    
    }
    
    this.eventEmitter.emit(this.selectedItemRating);

  }

  changedItemRating(): void {
    
    this.eventEmitter.emit(this.selectedItemRating);

  }

}
