import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private databaseService: DatabaseService) {}

  isExpanded: boolean = false;
  isEnable: boolean = true;
  isEnableB: boolean = true;
  Professor: string;
  Materia: string;
  Conteudo: string;
  Dificuldade: any;
  
  toggleCard() {

    this.isExpanded = true
  }

  Adicionado(){

    this.databaseService.addItem(this.Professor, this.Materia, this.Conteudo, this.Dificuldade).then((db) => {
      console.log("Linha inserida com sucesso", db);
    }).catch((error) =>{
      
    })

    this.Professor = '';
    this.Materia = '';
    this.Conteudo = '';

    this.isExpanded = false
  }

  Cancelar(){

    this.Professor = '';
    this.Materia = '';
    this.Conteudo = '';
    this.Dificuldade = '';
    this.isExpanded = false
  }

  camposPreenchidos(): boolean {
    return this.Professor && this.Materia && this.Conteudo && this.Dificuldade;
  }

}
