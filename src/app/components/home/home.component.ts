import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent {
  RNazwa: string = 'Twoja nazwa trasy';
  constructor(public mapService: MapService) {}
  
}
