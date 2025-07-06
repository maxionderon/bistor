import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BistorComponent } from "./components/bistor/bistor.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BistorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BISTOR';
}
