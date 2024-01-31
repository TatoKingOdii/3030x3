import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Potato} from "../data/Potato";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgIf,
    MatCardTitle,
    FormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatCardActions,
    MatButton
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnChanges {
  title = 'Select a potato or create a new one!';
  @Input() selectedPotato?: Potato;
  @Input() potatoList?: Potato[] = [];
  @Output() onPotatoSave = new EventEmitter<Potato>;
  localPotato: Potato = this.getDefaultPotato()

  ngOnChanges(changes: SimpleChanges) {
    let newPotato = changes['selectedPotato'] && changes['selectedPotato'].currentValue;
    if (newPotato) {
      this.localPotato = {
        id: newPotato.id,
        name: newPotato.name,
        cookTime: newPotato.cookTime,
        seasoning: newPotato.seasoning
      };
    } else {
      this.reset();
    }
  }

  createPotato(createdPotato?: Potato) {
    console.log("Creating Potato: " + JSON.stringify(createdPotato))

    if (this.potatoList && createdPotato) {
      this.potatoList.push({
        id: Math.random(),
        name: createdPotato.name,
        cookTime: createdPotato.cookTime,
        seasoning: createdPotato.seasoning
      })

      this.reset();
    }
  }

  savePotato(updatedPotato?: Potato) {
    console.log("Update for: " + JSON.stringify(updatedPotato))

    if (this.potatoList && updatedPotato) {
      let idx: number = this.potatoList.findIndex(potato => potato.id == updatedPotato.id);

      if (idx !== -1) {
        this.onPotatoSave.emit(updatedPotato);
        this.potatoList[idx] = {
          id: updatedPotato.id,
          name: updatedPotato.name,
          cookTime: updatedPotato.cookTime,
          seasoning: updatedPotato.seasoning
        }
      } else {
        this.createPotato(updatedPotato);
      }

      // Maybe
      this.reset();
    }
  }

  reset() {
    this.localPotato = this.getDefaultPotato();
  }

  private getDefaultPotato() : Potato {
    return {
      id: -1,
      name: '',
      cookTime: undefined,
      seasoning: ''
    }
  }
}
