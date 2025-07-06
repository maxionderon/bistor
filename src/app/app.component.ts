import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LimitsComponent } from "./components/limits-components/limits/limits.component";
import { SpreadsheetComponent } from './components/spreadsheet-components/spreadsheet/spreadsheet.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpreadsheetComponent, LimitsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BISTOR';
}
