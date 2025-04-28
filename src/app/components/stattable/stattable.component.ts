import { Component } from '@angular/core';
import { CalculationService } from '../../services/CalculationService/calculation.service';
import { Result } from '../../model/result';
import { CommonModule } from '@angular/common';
import { ItemType } from '../../model/itemType';

@Component({
  selector: 'app-stattable',
  imports: [CommonModule],
  templateUrl: './stattable.component.html',
  styleUrl: './stattable.component.css'
})
export class StattableComponent {

  calculationService: CalculationService = new CalculationService();
  results: Array<Result>
  itemType: typeof ItemType = ItemType;

  constructor() {

    this.results = this.calculationService.calculate().sort((result1, result2) => {

      if( result1.getValue(ItemType.accuracy) > result2.getValue(ItemType.accuracy) ) {

        return 1;

      }

      if( result1.getValue(ItemType.accuracy) < result2.getValue(ItemType.accuracy) ) {

        return -1;

      }

      if( result1.getValue(ItemType.alacrity) > result2.getValue(ItemType.alacrity) ) {

        return 1;

      }

      if( result1.getValue(ItemType.alacrity) < result2.getValue(ItemType.alacrity) ) {

        return -1;

      }

      return 0;

    

    });

  }

  getValue(result: Result, itemType: ItemType): number {

    return result.getValue(itemType);

  }

  getPercent(result: Result, itemType: ItemType): number {

    return result.getPercent(itemType);

  }

}
