import { Component } from '@angular/core';
import { SelectItemRatingComponent } from "../select-item-rating/select-item-rating.component";
import { BistorService } from '../../services/bistor/bistor.service';
import { IconService } from '../../services/iconService/icon.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectItemTypesComponent } from "../select-item-types/select-item-types.component";
import { ItemType } from '../../model/itemType';
import { SelectStimItemTypesComponent } from "../select-stim-item-types/select-stim-item-types.component";
import { SelectSetBonusItemTypesComponent } from "../select-set-bonus-item-types/select-set-bonus-item-types.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spreadsheet',
  imports: [CommonModule, SelectItemRatingComponent, FontAwesomeModule, SelectItemTypesComponent, SelectStimItemTypesComponent, SelectSetBonusItemTypesComponent],
  templateUrl: './spreadsheet.component.html',
  styleUrl: './spreadsheet.component.css'
})
export class SpreadsheetComponent {

  bistor: BistorService;
  iconService: IconService;
  
  itemRatingEnhancements: number;
  chosenEnhancementsItemTypes: Map<ItemType, boolean>;

  itemRatingSetBonus: number;
  firstSetBonus: Map<ItemType, boolean>;
  secondSetBonus: Map<ItemType, boolean>;


  itemRatingAugments: number;
  chosenAugmentsItemTypes: Map<ItemType, boolean>;

  itemRatingStim: number;
  chosenStimItemTypes: Array<ItemType>
  
  showFirstSetBonus: boolean;
  showSecondSetBonus: boolean;
  

  constructor() {

    this.bistor = new BistorService();
    this.iconService = new IconService()

    this.itemRatingEnhancements = 0;
    this.chosenEnhancementsItemTypes = new Map<ItemType, boolean>();

    this.itemRatingSetBonus = 0;
    this.firstSetBonus = new Map<ItemType, boolean>();
    this.secondSetBonus = new Map<ItemType, boolean>();

    this.itemRatingAugments = 0;
    this.chosenAugmentsItemTypes = new Map<ItemType, boolean>();

    this.itemRatingStim = 0;
    this.chosenStimItemTypes = new Array<ItemType>();

    this.showFirstSetBonus = false;
    this.showSecondSetBonus = false;

    
  }

  setItemRatingEnhancements(itemRatingEnhancements: number): void {

    this.itemRatingEnhancements = itemRatingEnhancements;
    
  }

  setChosenEnhancementsItemTypes(chosenEnhancementItemTypes: Map<ItemType, boolean>): void {

    this.chosenEnhancementsItemTypes = chosenEnhancementItemTypes;
    this.calculateSetBonusItemTypes();

  }

  setItemRatingSetBonus(itemRatingSetBonus: number): void {

    this.itemRatingSetBonus = itemRatingSetBonus;

  }

  setItemRatingAugments(itemRatingAugments: number): void {

    this.itemRatingAugments = itemRatingAugments;

  }

  setChosenAugmentsItemTypes(chosenAugmentItemTypes: Map<ItemType, boolean>): void {

    this.chosenAugmentsItemTypes = chosenAugmentItemTypes;

  }

  setItemRatingStim(itemRatingStim: number): void {

    this.itemRatingStim = itemRatingStim;

  }

  setChosenStimItemTypes(chosenStimItemTypes: Array<ItemType>): void {

    this.chosenStimItemTypes = chosenStimItemTypes;

  }

  private calculateSetBonusItemTypes(): void {

    this.firstSetBonus.clear();
    this.secondSetBonus.clear();
    this.showFirstSetBonus = false;

    this.chosenEnhancementsItemTypes.forEach( (value: boolean, key: ItemType, map: Map<ItemType, boolean>) => {

      if( value == true && key != ItemType.accuracy) {

        this.firstSetBonus.set(key, false);
        this.secondSetBonus.set(key, false);
        this.showFirstSetBonus = true;
        this.showSecondSetBonus = false;

      }

    });

  }

  firstSetBonusChange(firstSetBonus: Map<ItemType, boolean>): void {

    let setBonusSelected = Array.from(firstSetBonus.values());

    for(let i: number = 0; i != setBonusSelected.length; i = i + 1) {

      if( setBonusSelected.at(i) == true ) {

        this.showSecondSetBonus = true;
        break;

      } else {

        this.showSecondSetBonus = false;

      }

    }

  }


  

}
