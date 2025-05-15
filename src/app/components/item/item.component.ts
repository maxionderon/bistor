import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../model/item';
import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { Stim } from '../../model/stim';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {

  @Input() item: Item | undefined;

  labelItemRating: string;
  labelItemType: string;
  labelSecondStat: string;
  labelTertiaryStat: string;
  
  isStim: boolean;

  constructor() {

    this.item = undefined;

    this.labelItemRating = "";
    this.labelItemType = "";
    this.labelSecondStat = "";
    this.labelTertiaryStat ="";

    this.isStim = false;
    
  }

  ngOnInit(): void {
      
    this.setLabels();

  }

  private setLabels() {

    if( this.item != undefined ) {

      this.labelItemRating = String(this.item.itemRating);
      this.labelItemType = String(this.item.itemType);
      
      if( this.item instanceof Enhancement) {

        this.labelTertiaryStat = String( (this.item as Enhancement).tertiaryStat );

      }

      if( this.item instanceof Augment ) {

        this.labelTertiaryStat = String( (this.item as Augment).tertiaryStat );

      }

      if( this.item instanceof Stim ) {

        this.labelTertiaryStat = String( (this.item as Stim).tertiaryStat );
        this.labelSecondStat = String( (this.item as Stim).secondStat );
        this.isStim = true;

      }

    }

    
    
  }
  

}
