
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { ItemType } from '../../model/itemType';
import { IconService } from '../../services/iconService/icon.service';

@Component({
  selector: 'app-select-set-bonus-item-types',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './select-set-bonus-item-types.component.html',
  styleUrl: './select-set-bonus-item-types.component.css'
})
export class SelectSetBonusItemTypesComponent implements OnInit {

  @Input("Icon")
  icon: IconDefinition;
  @Input("NumberOfSetBonus")
  numberOfSetBonus: number;
  @Input("setBonus")
  setBonus: Map<ItemType, boolean>;

  labelNumberOfSetBonus: string;

  iconService: IconService;

  @Output("Change")
  eventEmitter: EventEmitter<Map<ItemType, boolean>>;

  constructor() {

    this.icon = { } as IconDefinition;    
    this.numberOfSetBonus = 0;
    this.setBonus = new Map<ItemType, boolean>();
    
    this.labelNumberOfSetBonus = "0";

    this.iconService = new IconService();

    this.eventEmitter = new EventEmitter<Map<ItemType, boolean>>();

  }

  ngOnInit(): void {
      
    this.labelNumberOfSetBonus = String(this.numberOfSetBonus);

  }

  change(itemType: ItemType): void {
      
      this.setBonus.forEach( (value: boolean, key: ItemType, map: Map<ItemType, boolean>) => {

        if( key == itemType ) {

          map.set(key, !value);

        } else {

          map.set(key, false);

        }

      });

      this.eventEmitter.emit(this.setBonus);

  }

  getItemTypes(): Array<ItemType> {

    return Array.from(this.setBonus.keys());

  }

  getChecked(itemType: ItemType): boolean {

    return this.setBonus.get(itemType) as boolean;

  }



}
