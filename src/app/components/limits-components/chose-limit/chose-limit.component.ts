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

  }

  ngOnInit(): void {

    this.iconItemType = this.iconService.getIcon(this.itemType);
    this.maximumInPercent = Constants.getPercent(this.maximum, this.itemType);
    this.minimumInPercent = Constants.getPercent(this.minimum, this.itemType);
    this.selectedMinimum = this.minimum;
    this.selectedMaximum = this.maximum;

    this.selectedMinimumInPercent = Constants.getPercent(this.selectedMinimum, this.itemType);
    this.selectedMaximumInPercent = Constants.getPercent(this.selectedMaximum, this.itemType);

  }

  protected changeMinimum(): void {
    
    this.selectedMinimumInPercent = Constants.getPercent(this.selectedMinimum, this.itemType);
    this.emitLimit();

  }

  protected changeMinimumInPercent(): void {

    this.selectedMinimum = Constants.getRating(this.selectedMinimumInPercent, this.itemType);
    this.emitLimit();

  }

  protected changeMaximum(): void {

    this.selectedMaximumInPercent = Constants.getPercent(this.selectedMaximum, this.itemType);
    this.emitLimit();

  }

  protected changeMaximumInPercent(): void {

    this.selectedMaximum = Constants.getRating(this.selectedMaximumInPercent, this.itemType);
    this.emitLimit();

  }

  private emitLimit(): void {

    this.eventEmitter.emit(new Limit(this.selectedMinimum, this.itemType, this.selectedMaximum, true));

  }

}
