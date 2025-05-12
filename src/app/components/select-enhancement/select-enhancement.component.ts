import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BistorService } from '../../services/bistor/bistor.service';
import { FormsModule } from '@angular/forms';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';

@Component({
  selector: 'app-select-enhancement',
  imports: [CommonModule, 
            FormsModule
  ],
  templateUrl: './select-enhancement.component.html',
  styleUrl: './select-enhancement.component.css'
})
export class SelectEnhancementComponent {

  bistor: BistorService;

  selectedItemRating: string;

  itemRatingIsSelected: boolean;

  selectedEnhancementType: ItemType;

  chooseItemRating: string;

  enhancementsItemTypes: Array<ItemType>;

  noEnhancementTypeAvailableAnymore: boolean;

  chosenEnhancements: Array<Enhancement>

  showChosenEnhancements: boolean;

  //@Output() nextStepPossible = new EventEmitter<boolean>();
  @Output() enhancements = new EventEmitter<Array<Enhancement>>();

  constructor() {

    this.bistor = new BistorService();
    this.selectedItemRating = String(this.bistor.itemRatingEnhancements.at(0));
    this.itemRatingIsSelected = false;
    
    this.chooseItemRating = "Choose";

    this.enhancementsItemTypes = this.bistor.enhancementsItemTypes.concat([]);

    this.selectedEnhancementType = this.enhancementsItemTypes.at(0) as ItemType;

    this.noEnhancementTypeAvailableAnymore = false;

    this.chosenEnhancements = new Array<Enhancement>;

    this.showChosenEnhancements = false;

    //this.nextStepPossible.emit(false);

  }

  selectItemRating() {

    if( this.itemRatingIsSelected == false ) {
      
      this.itemRatingIsSelected = true;
      this.chooseItemRating = "Modify";

    } else {

      this.itemRatingIsSelected = false;
      this.chooseItemRating = "Choose";
      this.enhancementsItemTypes = this.bistor.enhancementsItemTypes.concat([]);
      this.selectedEnhancementType = this.enhancementsItemTypes.at(0) as ItemType;
      this.noEnhancementTypeAvailableAnymore = false;
      this.chosenEnhancements = new Array<Enhancement>;
      this.showChosenEnhancements = false;
      //this.nextStepPossible.emit(false);
      this.enhancements.emit([]);
      
    }    

  }

  addEnhancement() {
    
    let enhancementType: ItemType = this.selectedEnhancementType;

    for(let i: number = 0; i != this.enhancementsItemTypes.length; i = i + 1) {

      if( enhancementType == this.enhancementsItemTypes.at(i) ) {

        //get enhancement
        this.chosenEnhancements.push( this.bistor.getEnhancement(Number.parseInt(this.selectedItemRating), enhancementType) as Enhancement);
        this.showChosenEnhancements = true;
        //send event
        //this.nextStepPossible.emit(true);
        this.enhancements.emit(this.chosenEnhancements);

        //erase enhancementType from select
        this.enhancementsItemTypes.splice(i, 1);
        if( this.enhancementsItemTypes.length != 0 ) {

          this.selectedEnhancementType = this.enhancementsItemTypes.at(0) as ItemType;

        } else {

          this.noEnhancementTypeAvailableAnymore = true;

        }
        
        break;

      }
      
    }

  }

}
