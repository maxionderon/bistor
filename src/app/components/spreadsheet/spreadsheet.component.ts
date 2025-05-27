import { Component } from '@angular/core';
import { SelectItemRatingComponent } from "../select-item-rating/select-item-rating.component";
import { BistorService } from '../../services/bistor/bistor.service';
import { IconService } from '../../services/iconService/icon.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectItemTypesComponent } from "../select-item-types/select-item-types.component";
import { ItemType } from '../../model/itemType';
import { SelectStimItemTypesComponent } from "../select-stim-item-types/select-stim-item-types.component";

@Component({
  selector: 'app-spreadsheet',
  imports: [SelectItemRatingComponent, FontAwesomeModule, SelectItemTypesComponent, SelectStimItemTypesComponent],
  templateUrl: './spreadsheet.component.html',
  styleUrl: './spreadsheet.component.css'
})
export class SpreadsheetComponent {

  bistor: BistorService;
  iconService: IconService;
  
  itemRatingEnhancements: number;
  chosenEnhancementsItemTypes: Map<ItemType, boolean>;

  itemRatingAugments: number;
  chosenAugmentsItemTypes: Map<ItemType, boolean>;

  

  constructor() {

    this.bistor = new BistorService();
    this.iconService = new IconService()

    this.itemRatingEnhancements = 0;
    this.chosenEnhancementsItemTypes = new Map<ItemType, boolean>();

    this.itemRatingAugments = 0;
    this.chosenAugmentsItemTypes = new Map<ItemType, boolean>();

    
  }

  setItemRatingEnhancements(itemRatingEnhancements: number): void {

    this.itemRatingEnhancements = itemRatingEnhancements;

  }

  setChosenEnhancementsItemTypes(chosenEnhancementItemTypes: Map<ItemType, boolean>): void {

    this.chosenEnhancementsItemTypes = chosenEnhancementItemTypes;

  }

  setItemRatingAugments(itemRatingAugments: number): void {

    this.itemRatingAugments = itemRatingAugments;

  }

  setChosenAugmentsItemTypes(chosenAugmentItemTypes: Map<ItemType, boolean>): void {

    this.chosenAugmentsItemTypes = chosenAugmentItemTypes;

  }


  

}
