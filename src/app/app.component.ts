import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpreadsheetComponent } from "./components/spreadsheet/spreadsheet.component";
import { LimitsComponent } from "./components/limits/limits.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpreadsheetComponent, LimitsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BISTOR';
}
