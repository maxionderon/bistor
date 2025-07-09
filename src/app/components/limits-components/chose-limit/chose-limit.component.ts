import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemType } from '../../../model/itemType';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { IconService } from '../../../services/iconService/icon.service';
import { FormsModule } from '@angular/forms';
import { Constants } from '../../../model/constants';
import { Limit } from '../../../model/limit';

@Component({
  selector: 'app-chose-limit',
  imports: [FaIconComponent, FormsModule],
  templateUrl: './chose-limit.component.html',
  styleUrl: './chose-limit.component.css'
})
export class ChoseLimitComponent implements OnInit {

  @Input("itemType")
  itemType: ItemType;
  @Input("maximum")
  maximum: number;
  @Input("minimum")
  minimum: number;

  protected maximumInPercent: number;
  protected minimumInPercent: number;

  protected iconItemType: IconDefinition;
  protected iconService: IconService;

  protected selectedMinimum: number;
  protected selectedMaximum: number;

  protected selectedMinimumInPercent: number;
  protected selectedMaximumInPercent: number;

  @Output("limit")
  eventEmitter: EventEmitter<Limit>;

  protected helperMinimum: string;
  protected helperMinimumPercent: string;
  protected helperMaximum: string;
  protected helperMaximumPercent: string;

  protected showHelperMinimum: boolean;
  protected showHelperMinimumPercent: boolean;
  protected showHelperMaximum: boolean;
  protected showHelperMaximumPercent: boolean;

  protected disabledInputMinimum: boolean;
  protected disabledInputMinimumPercent: boolean;
  protected disabledInputMaximum: boolean;
  protected disabledInputMaximumPercent: boolean;
  
  constructor() {

    this.itemType = ItemType.mastery;
    this.maximum = 0;
    this.minimum = 0;
    this.maximumInPercent = 0;
    this.minimumInPercent = 0;
    this.iconItemType = {} as IconDefinition;
    this.iconService = new IconService();
    this.selectedMinimum = 0;
    this.selectedMaximum = 0;

    this.selectedMinimumInPercent = 0;
    this.selectedMaximumInPercent = 0;

    this.eventEmitter = new EventEmitter<Limit>();
    
    this.helperMinimum = "";
    this.helperMinimumPercent = "";
    this.helperMaximum = "";
    this.helperMaximumPercent = "";

    this.showHelperMinimum = false;
    this.showHelperMinimumPercent = false;
    this.showHelperMaximum = false;
    this.showHelperMaximumPercent = false;

    this.disabledInputMinimum = false;
    this.disabledInputMinimumPercent = false;
    this.disabledInputMaximum = false;
    this.disabledInputMaximumPercent = false;

  }

  ngOnInit(): void {

    this.iconItemType = this.iconService.getIcon(this.itemType);
    this.maximumInPercent = Constants.getPercent(this.maximum, this.itemType);
    this.minimumInPercent = Constants.getPercent(this.minimum, this.itemType);
    this.selectedMinimum = this.minimum;
    this.selectedMaximum = this.maximum;

    this.selectedMinimumInPercent = Constants.getPercent(this.selectedMinimum, this.itemType);
    this.selectedMaximumInPercent = Constants.getPercent(this.selectedMaximum, this.itemType);

    this.emitLimit(true);

  }

  protected changeMinimum(): void {

    if( this.selectedMinimum < this.minimum || this.selectedMinimum >= this.selectedMaximum) {

      this.helperMinimum = this.buildHelper(this.minimum, this.selectedMaximum);
      this.showHelperMinimum = true;
      this.disableInput();
      this.emitLimit(false);

    } else {

      this.selectedMinimumInPercent = Constants.getPercent(this.selectedMinimum, this.itemType);
      this.showHelperMinimum = false;
      this.enableInput();
      this.emitLimit(true);

    }

  }

  protected changeMinimumInPercent(): void {

    if( this.selectedMinimumInPercent < this.minimumInPercent || this.selectedMinimumInPercent >= this.selectedMaximumInPercent ) {

      this.helperMinimumPercent = this.buildHelper(this.minimumInPercent, this.selectedMaximumInPercent);
      this.showHelperMinimumPercent = true;
      this.disableInput();
      this.emitLimit(false);

    } else {

      this.selectedMinimum = Constants.getRating(this.selectedMinimumInPercent, this.itemType);
      this.showHelperMinimumPercent = false;
      this.enableInput();
      this.emitLimit(true);

    }

  }

  protected changeMaximum(): void {

    if( this.selectedMaximum <= this.selectedMinimum  || this.selectedMaximum > this.maximum ) {

      this.helperMaximum = this.buildHelper(this.selectedMinimum, this.maximum);
      this.showHelperMaximum = true;
      this.disableInput();
      this.emitLimit(false);

    } else {

      this.selectedMaximumInPercent = Constants.getPercent(this.selectedMaximum, this.itemType);
      this.showHelperMaximum = false;
      this.enableInput();
      this.emitLimit(true);

    }

  }

  protected changeMaximumInPercent(): void {

    if( this.selectedMaximumInPercent <= this.selectedMinimumInPercent || this.selectedMaximumInPercent > this.maximumInPercent ) {

      this.helperMaximumPercent = this.buildHelper(this.selectedMinimumInPercent, this.maximumInPercent)
      this.showHelperMaximumPercent = true;
      this.disableInput();
      this.emitLimit(false);

    } else {

      this.selectedMaximum = Constants.getRating(this.selectedMaximumInPercent, this.itemType);
      this.showHelperMaximumPercent = false;
      this.enableInput();
      this.emitLimit(true);
    
    }

  }

  private emitLimit(legit: boolean): void {

    this.eventEmitter.emit(new Limit(this.selectedMinimum, this.itemType, this.selectedMaximum, legit));

  }

  private buildHelper(limitOne: number, limitTwo: number): string {

    return "Value should be between " + String(limitOne) + " and " + String(limitTwo) ;

  }

  private disableInput(): void {

    if( this.showHelperMinimum == true ) {

      this.disabledInputMinimum = false;
      this.disabledInputMinimumPercent = true;
      this.disabledInputMaximum = true;
      this.disabledInputMaximumPercent = true;

    }

    if( this.showHelperMinimumPercent == true ) {

      this.disabledInputMinimum = true;
      this.disabledInputMinimumPercent = false;
      this.disabledInputMaximum = true;
      this.disabledInputMaximumPercent = true;

    }

    if( this.showHelperMaximum == true ) {

      this.disabledInputMinimum = true;
      this.disabledInputMinimumPercent = true;
      this.disabledInputMaximum = false;
      this.disabledInputMaximumPercent = true;

    }

    if( this.showHelperMaximumPercent == true ) {

      this.disabledInputMinimum = true;
      this.disabledInputMinimumPercent = true;
      this.disabledInputMaximum = true;
      this.disabledInputMaximumPercent = false;

    }

  }

  private enableInput(): void {

    this.disabledInputMinimum = false;
    this.disabledInputMinimumPercent = false;
    this.disabledInputMaximum = false;
    this.disabledInputMaximumPercent = false;

  }

}
