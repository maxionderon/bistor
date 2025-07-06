import { Component, Input, OnInit } from '@angular/core';
import { ItemType } from '../../../model/itemType';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { IconService } from '../../../services/iconService/icon.service';
import { FormsModule } from '@angular/forms';

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

  protected iconItemType: IconDefinition;
  protected iconService: IconService;

  protected selectedMinimum: number;
  protected selectedMaximum: number;

  constructor() {

    this.itemType = ItemType.mastery;
    this.maximum = 0;
    this.minimum = 0;
    this.iconItemType = {} as IconDefinition;
    this.iconService = new IconService();
    this.selectedMinimum = 0;
    this.selectedMaximum = 0;

  }

  ngOnInit(): void {

    this.iconItemType = this.iconService.getIcon(this.itemType);
    this.selectedMinimum = this.minimum;
    this.selectedMaximum = this.maximum;

  }

}
