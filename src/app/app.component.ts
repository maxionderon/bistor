import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectGearComponent } from "./components/select-gear/select-gear.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelectGearComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BISTOR';
}
