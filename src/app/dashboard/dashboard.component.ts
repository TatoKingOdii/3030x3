import {Component} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {Potato} from "../data/Potato";
import {DefaultPotatoes} from "../data/DefaultPotatoes";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  potatoList: Potato[];

  constructor() {
    this.potatoList = DefaultPotatoes;
  }
}

