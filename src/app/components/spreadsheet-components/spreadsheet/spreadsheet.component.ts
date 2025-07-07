import { Component, EventEmitter, Output } from '@angular/core';
import { SelectItemRatingComponent } from "../select-item-rating/select-item-rating.component";
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { SelectItemTypesComponent } from "../select-item-types/select-item-types.component";
import { SelectSetBonusItemTypesComponent } from "../select-set-bonus-item-types/select-set-bonus-item-types.component";
import { BistorService } from '../../../services/bistor/bistor.service';
import { IconService } from '../../../services/iconService/icon.service';
import { CalculationService } from '../../../services/CalculationService/calculation.service';
import { ItemType } from '../../../model/itemType';
import { Result } from '../../../model/result';
import { Stim } from '../../../model/stim';
import { Enhancement } from '../../../model/enhancement';
import { Augment } from '../../../model/augment';
import { SelectStimItemTypesComponent } from '../select-stim-item-types/select-stim-item-types.component';


@Component({
  selector: 'app-spreadsheet',
  imports: [SelectItemRatingComponent, FontAwesomeModule, SelectItemTypesComponent, SelectStimItemTypesComponent, SelectSetBonusItemTypesComponent],
  templateUrl: './spreadsheet.component.html',
  styleUrl: './spreadsheet.component.css'
})
export class SpreadsheetComponent {

  bistor: BistorService;
  iconService: IconService;
  calculationService: CalculationService;
  
  itemRatingEnhancements: number;
  chosenEnhancementsItemTypes: Map<ItemType, boolean>;

  itemRatingSetBonus: number;
  firstSetBonus: Map<ItemType, boolean>;
  secondSetBonus: Map<ItemType, boolean>;


  itemRatingAugments: number;
  chosenAugmentsItemTypes: Map<ItemType, boolean>;

  itemRatingStim: number;
  chosenStimItemTypes: Map<Array<ItemType>, boolean>;
    
  showFirstSetBonus: boolean;
  showSecondSetBonus: boolean;

  isExpanded: boolean;
  iconIsExpanded: IconDefinition;

  isCalculating: boolean;
  
  @Output("results")
  eventEmitter: EventEmitter<Array<Result>>;

  calculated: boolean;

  constructor() {

    this.bistor = new BistorService();
    this.iconService = new IconService()
    this.calculationService = new CalculationService();

    this.itemRatingEnhancements = 0;
    this.chosenEnhancementsItemTypes = new Map<ItemType, boolean>();
    this.initializeChosenEnhancementsItemTypes();

    this.itemRatingSetBonus = 0;
    this.firstSetBonus = new Map<ItemType, boolean>();
    this.secondSetBonus = new Map<ItemType, boolean>();

    this.itemRatingAugments = 0;
    this.chosenAugmentsItemTypes = new Map<ItemType, boolean>();
    this.initializeChosenAugmentsItemTypes();

    this.itemRatingStim = 0;
    this.chosenStimItemTypes = new Map<Array<ItemType>, boolean>();
    this.initializeChosenStimItemTypes();

    this.showFirstSetBonus = false;
    this.showSecondSetBonus = false;

    this.isExpanded = true;
    this.iconIsExpanded = this.getIconIsExpanded();

    this.isCalculating = false;

    this.eventEmitter = new EventEmitter<Array<Result>>();

    this.calculated = false;
    
  }

  protected setItemRatingEnhancements(itemRatingEnhancements: number): void {

    this.itemRatingEnhancements = itemRatingEnhancements;
    
  }

  protected setChosenEnhancementsItemTypes(chosenEnhancementItemTypes: Map<ItemType, boolean>): void {

    this.chosenEnhancementsItemTypes = chosenEnhancementItemTypes;
    this.calculateSetBonusItemTypes();

  }

  protected setItemRatingSetBonus(itemRatingSetBonus: number): void {

    this.itemRatingSetBonus = itemRatingSetBonus;

  }

  protected setItemRatingAugments(itemRatingAugments: number): void {

    this.itemRatingAugments = itemRatingAugments;

  }

  protected setChosenAugmentsItemTypes(chosenAugmentItemTypes: Map<ItemType, boolean>): void {

    this.chosenAugmentsItemTypes = chosenAugmentItemTypes;

  }

  protected setItemRatingStim(itemRatingStim: number): void {

    this.itemRatingStim = itemRatingStim;

  }

  protected setChosenStimItemTypes(chosenStimItemTypes: Map<Array<ItemType>, boolean>): void {

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

  protected firstSetBonusChange(firstSetBonus: Map<ItemType, boolean>): void {

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

  protected expand(): void {

    this.isExpanded = !this.isExpanded;
    this.iconIsExpanded = this.getIconIsExpanded();

  }

  private getIconIsExpanded(): IconDefinition {

    if( this.isExpanded == true ) {

      return this.iconService.iconShowLess;

    } else {

      return this.iconService.iconShowMore;

    }

  }

  protected calculate(): void {

    this.isCalculating = true;

    let enhancements: Array<Enhancement> = new Array<Enhancement>();

    this.chosenEnhancementsItemTypes.forEach( (value: boolean, key: ItemType) => {

      if( value == true ) {

        enhancements.push( this.bistor.getEnhancement( this.itemRatingEnhancements, key) as Enhancement );

      }

    });

    let augments: Array<Augment> = new Array<Augment>();

    this.chosenAugmentsItemTypes.forEach( (value: boolean, key: ItemType) => {

      if( value == true ) {

        augments.push( this.bistor.getAugment( this.itemRatingAugments, key) as Augment );

      }

    });

    let setBonus: Array<Enhancement> = new Array<Enhancement>();

    this.firstSetBonus.forEach( (value: boolean, key: ItemType) => {

      if( value = true ) {

        setBonus.push( this.bistor.getSetBonus(this.itemRatingSetBonus, key) as Enhancement);

      }

    });

    this.secondSetBonus.forEach( (value: boolean, key: ItemType) => {

      if( value = true ) {

        setBonus.push( this.bistor.getSetBonus(this.itemRatingSetBonus, key) as Enhancement);

      }

    });

    let stim: Stim | undefined = undefined;


    let chosenStimItemTypes: Array<ItemType> = new Array<ItemType>();

    for(const bob of this.chosenStimItemTypes) {

      if( bob[1] == true ) {

        chosenStimItemTypes = bob[0];
        break;

      }

    }

    if( chosenStimItemTypes.length != 0 ) {

      stim = this.bistor.getStim( this.itemRatingStim, chosenStimItemTypes.at(0) as ItemType) as Stim;

    }


    /*
    if( this.setChosenStimItemTypes.length != 0 ) {

      //stim = this.bistor.getStim( this.itemRatingStim, this.chosenStimItemTypes.at(0) as ItemType) as Stim

    }
    */

    let results: Array<Result> = this.calculationService.calculateResults(enhancements, augments, setBonus, stim);

    this.eventEmitter.emit(results);

    this.isCalculating = false;

    this.calculated = true;
    this.expand();
    
  }

  private initializeChosenEnhancementsItemTypes(): void {

    this.bistor.enhancementsItemTypes.forEach( (itemType: ItemType) => {

      this.chosenEnhancementsItemTypes.set(itemType, false);

    });

  }

  private initializeChosenAugmentsItemTypes(): void {

    this.bistor.augmentsItemTypes.forEach( (itemType: ItemType) => {

      this.chosenAugmentsItemTypes.set(itemType, false);

    });

  }

  private initializeChosenStimItemTypes(): void {

    this.bistor.stimsItemTypes.forEach( (stim: Array<ItemType>) => {

      this.chosenStimItemTypes.set(stim, false);

    });

  }

}
