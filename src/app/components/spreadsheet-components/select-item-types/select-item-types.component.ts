import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms';
import { ItemType } from '../../../model/itemType';
import { IconService } from '../../../services/iconService/icon.service';

@Component({
  selector: 'app-select-item-types',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './select-item-types.component.html',
  styleUrl: './select-item-types.component.css'
})
export class SelectItemTypesComponent implements OnInit{

  @Input("Icon")
  icon: IconDefinition;
  @Input("ChosenItemType")
  chosenItemType: Map<ItemType, boolean>

  itemTypes: Array<ItemType>;
  
  iconService: IconService;
  
  @Output("ChosenItemTypes")
  eventEmitter: EventEmitter<Map<ItemType, boolean>>; 

  constructor() {

    this.icon = {} as IconDefinition;
    this.itemTypes = new Array<ItemType>;

    this.iconService = new IconService();

    this.chosenItemType = new Map<ItemType, boolean>;

    this.eventEmitter = new EventEmitter<Map<ItemType, boolean>>();

  }

  ngOnInit(): void {

    this.itemTypes = Array.from(this.chosenItemType.keys());
      
  }
    
  change(itemType: ItemType) {

    this.chosenItemType.set(itemType, !(this.chosenItemType.get(itemType) as boolean));
    
    this.eventEmitter.emit(this.chosenItemType);

  }

}
