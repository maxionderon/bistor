import { Component, Input, OnInit } from '@angular/core';
import { Stim } from '../../../model/stim';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconService } from '../../../services/iconService/icon.service';

@Component({
  selector: 'app-stim',
  imports: [FontAwesomeModule],
  templateUrl: './stim.component.html',
  styleUrl: './stim.component.css'
})
export class StimComponent implements OnInit {

  @Input("Stim")
  stim: Stim;

  iconService: IconService;


  constructor() {

    this.stim = {} as Stim;
    
    this.iconService = new IconService();

  }

  ngOnInit(): void {
      
  }

}
