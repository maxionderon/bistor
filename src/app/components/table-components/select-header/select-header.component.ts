import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemType } from '../../../model/itemType';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-header',
  imports: [FormsModule],
  templateUrl: './select-header.component.html',
  styleUrl: './select-header.component.css'
})
export class SelectHeaderComponent implements OnInit {

  @Input("Options")
  options: Array<ItemType>;
  @Input("ItemType")
  itemType: ItemType;

  selectedOption: ItemType;

  @Output("SelectedOption")
  eventEmitter: EventEmitter<ItemType>;


  constructor() {

    this.options = new Array<ItemType>();
    this.itemType = {} as ItemType;  
    this.selectedOption = {} as ItemType;
    this.eventEmitter = new EventEmitter<ItemType>();

  }

  ngOnInit(): void {
    
    this.selectedOption = this.itemType;

  }

  protected changedOption(): void {

    this.eventEmitter.emit(this.selectedOption);

  }

}
