import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemType } from '../../model/itemType';
import { Item } from '../../model/item';
import { ItemClass } from '../../model/itemClass';
import { BistorService } from '../../services/bistor/bistor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-select-item',
  imports: [CommonModule, FormsModule, ItemComponent],
  templateUrl: './select-item.component.html',
  styleUrl: './select-item.component.css'
})
export class SelectItemComponent implements OnInit{

  @Input() itemClass: ItemClass | undefined;

  @Output() outputSelectedItems: EventEmitter<Array<Item>>;

  private bistor: BistorService;

  itemRatings: Array<number>;
  itemTypes: Array<ItemType>;
  workingItemTypes: Array<ItemType>;

  selectedItemRating: string;
  itemRatingIsSelected: boolean;

  selectedItemType: ItemType | undefined;
  noItemAvailableAnymore: boolean;

  textChooseItemRating: string;

  showChosenItems: boolean;
  chosenItems: Array<Item>;

  //Labels
  labelItemType: string;
  labelChosenItemType: string;
  labelAddItem: string;
  labelChosenItem: string;

  constructor() {

    this.itemClass = undefined;

    this.bistor = new BistorService();

    this.itemRatings = [];
    this.itemTypes = [];
    this.workingItemTypes = [];

    this.outputSelectedItems = new EventEmitter<Array<Item>>();
    
    this.selectedItemRating = "";
    this.itemRatingIsSelected = false;
    
    this.selectedItemType = undefined;
    this.noItemAvailableAnymore = false;

    this.textChooseItemRating = "Choose";

    this.showChosenItems = false;

    this.chosenItems = new Array<Item>;

    this.labelItemType = "";
    this.labelChosenItemType = "";
    this.labelAddItem = "";
    this.labelChosenItem = "";

  }

  ngOnInit(): void {

    if( this.itemClass == ItemClass.enhancement ) {

      this.itemRatings = this.bistor.itemRatingEnhancements.concat([]);
      this.itemTypes = this.bistor.enhancementsItemTypes;
      

    }

    if( this.itemClass == ItemClass.augment ) {

      this.itemRatings = this.bistor.itemRatingAugments.concat([]);
      this.itemTypes = this.bistor.augmentsItemTypes;

    }
    
    if( this.itemClass == ItemClass.stim ) {

      this.itemRatings = this.bistor.itemRatingStims.concat([]);
      //fehlt noch

    }
    
    this.workingItemTypes = this.itemTypes.concat([]);
    this.selectedItemRating = this.selectedItemRating = String(this.itemRatings.at(0));
    this.selectedItemType = this.workingItemTypes.at(0);
    this.setLabel();

  }

  selectItemRating() {

    if( this.itemRatingIsSelected == false ) {

      this.itemRatingIsSelected = true;
      this.textChooseItemRating = "Modify";

    } else {

      this.itemRatingIsSelected = false;
      this.textChooseItemRating = "Choose";
      this.workingItemTypes = this.itemTypes.concat([]);
      this.selectedItemType = this.workingItemTypes.at(0);
      this.noItemAvailableAnymore = false;
      this.chosenItems = new Array<Item>;
      this.showChosenItems = false;
      this.outputSelectedItems.emit([]);

    }

  }

  addItem() {

    let itemType: ItemType = this.selectedItemType as ItemType;

    for(let i: number = 0; i != this.workingItemTypes.length; i = i + 1) {

      if( itemType == this.workingItemTypes.at(i) ) {

        //getItem
        this.chosenItems.push( this.bistor.getItem(Number.parseInt(this.selectedItemRating), itemType, this.itemClass as ItemClass) as Item);
        this.showChosenItems = true;
        this.outputSelectedItems.emit(this.chosenItems);

        this.workingItemTypes.splice(i, 1);
        if( this.workingItemTypes.length != 0 ) {

          this.selectedItemType = this.workingItemTypes.at(0); 

        } else {

          this.noItemAvailableAnymore = true;

        }

        break;
      
      }

    }

  }

  private setLabel() {

    if( this.itemClass == ItemClass.enhancement ) {

      this.manipulateLabel("Enhancement");      

    }

    if( this.itemClass == ItemClass.augment) {

      this.manipulateLabel("Augment");

    }

    if( this.itemClass == ItemClass.stim ) {

      this.manipulateLabel("Stim")

    }

  }

  private manipulateLabel(s: string) {

    this.labelItemType = s + " Type";
    this.labelChosenItemType = "Chosen " + s + "s";
    this.labelAddItem = "Add " + s;
    this.labelChosenItem = "Chosen " + s;

  } 

}