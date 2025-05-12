import { Component, EventEmitter, Output } from '@angular/core';
import { Augment } from '../../model/augment';
import { BistorService } from '../../services/bistor/bistor.service';
import { ItemType } from '../../model/itemType';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Enhancement } from '../../model/enhancement';

@Component({
  selector: 'app-select-augment',
  imports: [CommonModule,
            FormsModule
  ],
  templateUrl: './select-augment.component.html',
  styleUrl: './select-augment.component.css'
})
export class SelectAugmentComponent {

  @Output() augments = new EventEmitter<Array<Augment>>();

  bistor: BistorService;

  selectedItemRating: string;
  itemRatingIsSelected: boolean;
  chooseItemRating: string;

  augmentItemTypes: Array<ItemType>;
  selectedAugmentType: ItemType;

  noAugmentTypeAvailableAnymore: boolean;

  chosenAugments: Array<Augment>;

  showChosenAugments: boolean;

  constructor() {

    this.bistor = new BistorService();

    this.selectedItemRating = String(this.bistor.itemRatingAugments.at(0));
    this.itemRatingIsSelected = false;
    this.chooseItemRating = "Choose";

    this.augmentItemTypes = this.bistor.augmentsItemTypes.concat([]);
    this.selectedAugmentType = this.augmentItemTypes.at(0) as ItemType;

    this.noAugmentTypeAvailableAnymore = false;

    this.chosenAugments = new Array<Augment>;

    this.showChosenAugments = false;

  }

  selectItemRating() {

    if( this.itemRatingIsSelected == false ) {

      this.itemRatingIsSelected = true;
      this.chooseItemRating = "Modify";

    } else {

      this.itemRatingIsSelected = false;
      this.chooseItemRating = "Choose";
      this.augmentItemTypes = this.bistor.augmentsItemTypes.concat([]);
      this.selectedAugmentType = this.augmentItemTypes.at(0) as ItemType;
      this.noAugmentTypeAvailableAnymore = false;
      this.chosenAugments = new Array<Enhancement>;
      this.showChosenAugments = false;
      this.augments.emit([]);

    }

  }

  addAugment() {

    let augmentType: ItemType = this.selectedAugmentType;

    for(let i: number = 0; i != this.augmentItemTypes.length; i = i + 1) {

      if( augmentType == this.augmentItemTypes.at(i) ) {

        //get Augment
        this.chosenAugments.push( this.bistor.getAugment(Number.parseInt(this.selectedItemRating), augmentType) as Augment);
        this.showChosenAugments = true;
        //send Event
        this.augments.emit(this.chosenAugments);

        //erase augmentType from select
        this.augmentItemTypes.splice(i, 1);

        if( this.augmentItemTypes.length != 0 ) {

          this.selectedAugmentType = this.augmentItemTypes.at(0) as ItemType;

        } else {

          this.noAugmentTypeAvailableAnymore = true;

        }

        break;

      }

    }

  }

}
