import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemType } from '../../model/itemType';

@Component({
  selector: 'app-select-set-bonus',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-set-bonus.component.html',
  styleUrl: './select-set-bonus.component.css'
})
export class SelectSetBonusComponent implements OnInit {

  @Input()
  disabled: boolean;
  @Input()
  itemTypes: Array<ItemType>;
  @Input()
  numberOfSetBonus: number;

  labelNumberOfSetBonus: string;
  labelSelectUpdate: string;

  selectedItemType: ItemType | undefined;

  update: boolean;

  @Output()
  outputEventEmitter: EventEmitter<ItemType>;

  constructor() {

    this.disabled = true;
    this.itemTypes = [];
    this.numberOfSetBonus = 0;
    this.labelNumberOfSetBonus = "";
    this.labelSelectUpdate = "";
    this.selectedItemType = undefined;
    this.update = false;
    this.outputEventEmitter = new EventEmitter<ItemType>();

  }

  ngOnInit(): void {

    this.labelSelectUpdate = "Select "
    this.labelNumberOfSetBonus = String(this.numberOfSetBonus) + ". Set Bonus Enhancement Type";
    this.selectedItemType = this.itemTypes.at(0);
    
  }

  addSetBonus() {

    this.outputEventEmitter.emit(this.selectedItemType);

    if( this.selectedItemType != undefined ) {

      this.update = true;
      this.labelSelectUpdate = "Update ";

    } else {

      this.update = false;
      this.labelSelectUpdate = "Select "

    }

  }

}
