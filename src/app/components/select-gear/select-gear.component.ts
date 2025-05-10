import { Component } from '@angular/core';
import { BistorService } from '../../services/bistor/bistor.service';
import { CommonModule } from '@angular/common';
import { SelectEnhancementComponent } from "../select-enhancement/select-enhancement.component";

@Component({
  selector: 'app-select-gear',
  imports: [CommonModule, SelectEnhancementComponent],
  templateUrl: './select-gear.component.html',
  styleUrl: './select-gear.component.css'
})
export class SelectGearComponent {

  bistor: BistorService;
  step: string;
  isFirstStep: boolean;

  constructor() {

    this.bistor = new BistorService;
    this.step = "1. Step";
    this.isFirstStep = true;

  }


}
