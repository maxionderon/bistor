import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { ItemType } from '../../model/itemType';
import { CommonModule } from '@angular/common';
import { IconService } from '../../services/iconService/icon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-item-types',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './select-item-types.component.html',
  styleUrl: './select-item-types.component.css'
})
export class SelectItemTypesComponent implements OnInit{

  @Input("Icon")
  icon: IconDefinition;
  @Input("ItemTypes")
  itemTypes: Array<ItemType>;

  iconService: IconService;

  chosenItemType: Map<ItemType, boolean>

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

    this.initializeChosenItemTypes();
      
  }

  private initializeChosenItemTypes(): void {

    this.itemTypes.forEach( (itemType: ItemType) => {

      this.chosenItemType.set(itemType, false);

    });

  }
  
  change(itemType: ItemType) {

    this.chosenItemType.set(itemType, !(this.chosenItemType.get(itemType) as boolean));
    
    this.eventEmitter.emit(this.chosenItemType);

  }

}
