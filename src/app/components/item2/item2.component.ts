import { Component, Input, OnInit } from '@angular/core';
import { ItemType } from '../../model/itemType';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { fa0, faArrowTrendDown, faArrowTrendUp, faCrosshairs, faGaugeHigh, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-item2',
  imports: [FontAwesomeModule],
  templateUrl: './item2.component.html',
  styleUrl: './item2.component.css'
})
export class Item2Component implements OnInit{

  @Input()
  itemType: ItemType | undefined;
  @Input()
  amount: number;

  iconItemType: IconDefinition;

  color: string;

  constructor() {

    this.itemType = undefined;
    this.amount = 0;
    this.iconItemType = fa0;
    this.color = "";
  }

  ngOnInit(): void {

    this.setIcon();
      
  }

  private setIcon() {

    if( this.itemType == ItemType.accuracy ) {

      this.iconItemType = faCrosshairs;
      this.color = "has-text-warning";

    }

    if( this.itemType == ItemType.alacrity ) {

      this.iconItemType = faGaugeHigh;
      this.color = "has-text-success";

    }

    if( this.itemType == ItemType.critical ) {

      this.iconItemType = faArrowTrendUp;
      this.color = "has-text-danger";

    }

    if( this.itemType == ItemType.shield ) {

      this.iconItemType = faShieldHalved;
      this.color = "has-text-info";

    }

    if( this.itemType == ItemType.absorb ) {

      this.iconItemType = faArrowTrendDown;
      this.color = "has-text-link";

    }

  }

}
