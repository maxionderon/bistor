import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectGearComponent } from "./components/select-gear/select-gear.component";
import { SpreadsheetComponent } from "./components/spreadsheet/spreadsheet.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelectGearComponent, SpreadsheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BISTOR';
}
