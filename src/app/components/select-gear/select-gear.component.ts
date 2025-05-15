import { Component } from '@angular/core';
import { BistorService } from '../../services/bistor/bistor.service';
import { CommonModule } from '@angular/common';
import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { FormsModule } from '@angular/forms';
import { SelectItemComponent } from "../select-item/select-item.component";
import { ItemClass } from '../../model/itemClass';
import { Item } from '../../model/item';

@Component({
  selector: 'app-select-gear',
  imports: [CommonModule, FormsModule, SelectItemComponent],
  templateUrl: './select-gear.component.html',
  styleUrl: './select-gear.component.css'
})
export class SelectGearComponent {

  bistor: BistorService;
  stepLabel: string;
  isFirstStep: boolean;
  isSecondStep: boolean;
  nextIsPossible: boolean;

  chosenEnhancements: Array<Enhancement>;
  chosenAugments: Array<Augment>;

  step: number;

  itemClass: typeof ItemClass = ItemClass;
  
  constructor() {

    this.bistor = new BistorService;
    this.stepLabel = "1. Step - Choose Enhancements";
    this.isFirstStep = true;
    this.isSecondStep = false;
    this.nextIsPossible = false;
    this.chosenEnhancements = new Array<Enhancement>;
    this.chosenAugments = new Array<Augment>;
    this.step = 1;

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

  setItems(items: Array<Item>) {

    if( items.at(0) instanceof Enhancement ) {

      this.setChosenEnhancements(items as Array<Enhancement>);

    }

    if( items.at(0) instanceof Augment ) {

      this.setChosenAugments(items as Array<Augment>);

    }
    
  }

  back() {

    if(this.step > 1 ) {

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

      this.stepLabel = "1. Step - Choose Enhancements";

    }

    if( this.step == 2 ) {

      this.isFirstStep = false;
      this.isSecondStep = true;

      this.stepLabel = "2. Step - Choose Augments";

    }

  }

}
