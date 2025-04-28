import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StattableComponent } from "./components/stattable/stattable.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StattableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BISTOR';
}
