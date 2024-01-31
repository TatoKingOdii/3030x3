import {Component, Input} from '@angular/core';
import {Potato} from "../data/Potato";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatActionList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatActionList,
    MatIcon,
    MatListItem,
    MatLine,
    MatButton,
    NgForOf,
    DetailComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  title = 'Potato Styles';
  @Input() potatoList?: Potato[];
  currentPotato?: Potato;

  selectPotato(selectedPotato: Potato) {
    this.currentPotato = selectedPotato;
  }

  deletePotato(deletedPotato: Potato) {
    if (this.potatoList && deletedPotato) {
      let idx: number = this.potatoList.findIndex(potato => potato.id == deletedPotato.id);

      console.log("Delete index found: " + idx);
      if (idx !== -1) {
        this.potatoList.splice(idx, 1);
      }
    }
    this.currentPotato = undefined;
  }

  handlePotatoUpdate(eventPotato: Potato) {
    // Just a test of sending something back to the list component
    console.log("Event Update for Potato Received: " + JSON.stringify(eventPotato))
  }
}
