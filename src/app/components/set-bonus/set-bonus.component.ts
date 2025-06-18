
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectSetBonusComponent } from "../select-set-bonus/select-set-bonus.component";
import { ItemType } from '../../model/itemType';

@Component({
  selector: 'app-set-bonus',
  imports: [FormsModule, SelectSetBonusComponent],
  templateUrl: './set-bonus.component.html',
  styleUrl: './set-bonus.component.css'
})
export class SetBonusComponent {

  @Input()
  setBonusEnhancementTypes: Array<ItemType>

  firstSetBonus: boolean;
  secondSetBonus: boolean;
  askSecondSetBonus: boolean;

  setBonusItemTypes: Map<number, ItemType>;

  @Output()
  outputEventEmitter: EventEmitter<Map<number,ItemType>>;

  constructor() {

    this.setBonusEnhancementTypes = [];
    this.firstSetBonus = false;
    this.secondSetBonus = false;
    this.askSecondSetBonus = false;
    this.setBonusItemTypes = new Map<number, ItemType>;
    this.outputEventEmitter = new EventEmitter<Map<number, ItemType>>;

  }

  changeSetBonus() {

    if( this.firstSetBonus == false ) {

      this.secondSetBonus = false;
      this.askSecondSetBonus = false;
      this.setBonusItemTypes = new Map<number, ItemType>;
      this.outputEventEmitter.emit(this.setBonusItemTypes);

    }

  }

  changeSecondSetBonus() {

    if( this.secondSetBonus == false ) {

      this.setBonusItemTypes.delete(2);
      this.outputEventEmitter.emit(this.setBonusItemTypes);

    }

  }

  addFirstSetBonus(itemType: ItemType) {

    this.setBonusItemTypes.set(1, itemType);
    this.askSecondSetBonus = true;

    this.outputEventEmitter.emit(this.setBonusItemTypes);

  }

  addSecondSetBonus(itemType: ItemType) {

    this.setBonusItemTypes.set(2, itemType);

    this.outputEventEmitter.emit(this.setBonusItemTypes);

  }

}