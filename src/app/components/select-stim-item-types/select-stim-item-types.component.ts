
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { ItemType } from '../../model/itemType';
import { IconService } from '../../services/iconService/icon.service';

@Component({
  selector: 'app-select-stim-item-types',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './select-stim-item-types.component.html',
  styleUrl: './select-stim-item-types.component.css'
})
export class SelectStimItemTypesComponent implements OnInit {

  @Input("Icon")
  icon: IconDefinition;
  @Input("StimItemTypes")
  stimItemTypes: Array<Array<ItemType>>;

  iconService: IconService;

  chosenStimItemTypes: Array<ItemType>;

  map: Map<Array<ItemType>, boolean>;

  @Output("ChosenStimItemTypes")
  eventEmitter: EventEmitter<Array<ItemType>>;

  constructor() {

    this.icon = {} as IconDefinition;
    this.stimItemTypes = new Array<Array<ItemType>>();

    this.iconService = new IconService();

    this.chosenStimItemTypes = new Array<ItemType>();

    this.map = new Map<Array<ItemType>, boolean>

    this.eventEmitter = new EventEmitter<Array<ItemType>>();

  }

  ngOnInit(): void {

    this.initializeMap();
      
  }

  change(chosenStimItemType: Array<ItemType>): void {

    this.map.forEach( (value: boolean, key: Array<ItemType>, map: Map<Array<ItemType>, boolean>) => {

      if( key == chosenStimItemType ) {

        map.set(key, !value)

      } else {

        map.set(key, false);
        
      }

    });

    if( this.map.get(chosenStimItemType) == true ) {

      this.chosenStimItemTypes = chosenStimItemType;

    } else {

      this.chosenStimItemTypes = new Array<ItemType>()

    }

    this.eventEmitter.emit(this.chosenStimItemTypes);

  }

  getItemType(stim: Array<ItemType>, number: number): ItemType {

    return stim.at(number) as ItemType;

  }

  private initializeMap(): void {

    this.stimItemTypes.forEach( (stim: Array<ItemType>) => {

      this.map.set(stim, false);

    });

  }

  getIsChecked(stim: Array<ItemType>): boolean {

    return this.map.get(stim) as boolean;

  }

}
