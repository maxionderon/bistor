import { Component } from '@angular/core';
import { BistorService } from '../../services/bistor/bistor.service';

import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { FormsModule } from '@angular/forms';
import { SelectItemComponent } from "../select-item/select-item.component";
import { ItemClass } from '../../model/itemClass';
import { Item } from '../../model/item';
import { SetBonusComponent } from "../set-bonus/set-bonus.component";
import { ItemType } from '../../model/itemType';
import { Stim } from '../../model/stim';
import { TableComponent } from "../table/table.component";
import { Result } from '../../model/result';
import { CalculationService } from '../../services/CalculationService/calculation.service';

@Component({
  selector: 'app-select-gear',
  imports: [FormsModule, SelectItemComponent, SetBonusComponent, TableComponent],
  templateUrl: './select-gear.component.html',
  styleUrl: './select-gear.component.css'
})
export class SelectGearComponent {

  bistor: BistorService;
  calculationService: CalculationService;
  labelStep: string;
  labelNext: string;
  isFirstStep: boolean;
  isSecondStep: boolean;
  isThirdStep: boolean;
  isFourthStep: boolean;
  nextIsPossible: boolean;

  chosenEnhancements: Array<Enhancement>;
  chosenAugments: Array<Augment>;
  chosenSetBonus: Array<Enhancement>;
  chosenStim: Stim | undefined;

  step: number;

  itemClass: typeof ItemClass = ItemClass;

  setBonusEnhancementTypes: Array<ItemType>;

  results: Array<Result>
  calculated: boolean;
  
  constructor() {

    this.bistor = new BistorService();
    this.calculationService = new CalculationService()
    this.labelStep = "1. Step - Choose Enhancements";
    this.labelNext = "Next";
    this.isFirstStep = true;
    this.isSecondStep = false;
    this.isThirdStep = false;
    this.isFourthStep = false;
    this.nextIsPossible = false;
    this.chosenEnhancements = new Array<Enhancement>;
    this.chosenAugments = new Array<Augment>;
    this.chosenSetBonus = new Array<Enhancement>
    this.chosenStim = undefined;
    this.step = 1;
    this.setBonusEnhancementTypes = new Array<ItemType>;
    this.results = new Array<Result>;
    this.calculated = false;

  }  

  setChosenEnhancements(enhancements: Array<Enhancement>) {

    this.chosenEnhancements = enhancements;

    if( this.chosenEnhancements.length != 0 ) {

      this.nextIsPossible = true;

    } else {

      this.nextIsPossible = false;

    }

  }

  setChosenAugments(augments: Array<Augment>) {

    this.chosenAugments = augments;

    if( this.chosenAugments.length != 0 ) {

      this.nextIsPossible = true;
      
    } else {

      this.nextIsPossible = false;

    }

  }

  setChosenStim(stim: Stim) {

    this.chosenStim = stim;
    this.nextIsPossible = true;

  }

  setItems(items: Array<Item>) {

    if( items.at(0) instanceof Enhancement ) {

      this.setChosenEnhancements(items as Array<Enhancement>);

    }

    if( items.at(0) instanceof Augment ) {

      this.setChosenAugments(items as Array<Augment>);

    }

    if( items.at(0) instanceof Stim ) {

      this.setChosenStim(items.at(0) as Stim);

    } 
    
  }

  back() {

    this.nextIsPossible = false;

    if(this.step > 1 ) {

      if( this.step == 4 ) {

        this.step = this.step - 1;

      }

      this.step = this.step - 1;
      this.setStep();

    }
    
  }

  next() {

    this.nextIsPossible = false;
    this.step = this.step + 1;
    this.setStep();

  }

  private setStep() {

    if( this.step == 1 ) {

      this.isFirstStep = true;
      this.isSecondStep = false;
      this.isThirdStep = false;
      this.isFourthStep = false;

      this.labelStep = "1. Step - Choose Enhancements";

      this.chosenEnhancements = new Array<Enhancement>;
      this.chosenAugments = new Array<Augment>;
      this.chosenSetBonus = new Array<Enhancement>;
      this.chosenStim = undefined;

    }

    if( this.step == 2 ) {

      this.isFirstStep = false;
      this.isSecondStep = true;
      this.isThirdStep = false;
      this.isFourthStep = false;

      this.labelStep = "2. Step - Choose Augments";

      this.chosenAugments = new Array<Augment>;
      this.chosenSetBonus = new Array<Enhancement>;
      this.chosenStim = undefined;

    }

    if( this.step == 3 ) {

      if( this.checkIfThirdStepIsNecessary() == false ) {

        this.step = this.step + 1;
        this.setStep();

      } else {

        this.calculateSetBonusEnhancementsTypes();

        this.isFirstStep = false;
        this.isSecondStep = false;
        this.isThirdStep = true;
        this.isFourthStep = false;

        this.labelStep = "3. Step - Choose Set Bonus Enhancements";

        this.chosenSetBonus = new Array<Enhancement>;
        this.chosenStim = undefined;

        this.nextIsPossible = true;

      }

    }

    if( this.step == 4 ) {

      this.isFirstStep = false;
      this.isSecondStep = false;
      this.isThirdStep = false;
      this.isFourthStep = true;

      this.labelStep = "4. Step - Choose Stim";
      this.labelNext = "Calculate";

      this.chosenStim = undefined;

    }

    if( this.step == 5 ) {

      this.nextIsPossible = false;

      this.calculateResults();

      this.calculated = true;

    }

  }

  private checkIfThirdStepIsNecessary(): boolean {

    if( this.chosenEnhancements.length != 0 ) {

      if( (this.chosenEnhancements.at(0)?.itemRating as number) >= 340) {

        return true;

      }

    }    

    return false;

  }
  
  private calculateSetBonusEnhancementsTypes() {

    let setBonusEnhancementTypes: Set<ItemType> = new Set<ItemType>;

    this.chosenEnhancements.forEach( (enhancement: Enhancement) => {

      setBonusEnhancementTypes.add(enhancement.itemType);

    });

    setBonusEnhancementTypes.delete(ItemType.accuracy);

    this.setBonusEnhancementTypes = Array.from(setBonusEnhancementTypes) as Array<ItemType>;

  }

  setSetBonus(setBonusItemTypes: Map<number, ItemType>) {

    let itemRating: number = 340;

    this.chosenSetBonus = new Array<Enhancement>;

    if( setBonusItemTypes.has(1) ) {

      for(let i: number = 0; i != this.bistor.setBonusByItemRating.get(itemRating)?.length; i = i + 1) {

        if( this.bistor.setBonusByItemRating.get(itemRating)?.at(i)?.itemType == setBonusItemTypes.get(1) ) {

          this.chosenSetBonus.push(this.bistor.setBonusByItemRating.get(itemRating)?.at(i) as Enhancement);

        }

      }   

    }

    if( setBonusItemTypes.has(2) ) {

      for(let i: number = 0; i != this.bistor.setBonusByItemRating.get(itemRating)?.length; i = i + 1) {

        if( this.bistor.setBonusByItemRating.get(itemRating)?.at(i)?.itemType == setBonusItemTypes.get(2) ) {

          this.chosenSetBonus.push(this.bistor.setBonusByItemRating.get(itemRating)?.at(i) as Enhancement);

        }

      }

    }

  }

  private calculateResults() {

    this.results = this.calculationService.calculateResults(this.chosenEnhancements, this.chosenAugments, this.chosenSetBonus, this.chosenStim);

  }

}
