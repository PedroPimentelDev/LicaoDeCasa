import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private databaseService: DatabaseService) {}

  clicado: boolean = false
  isChecked : boolean = false
  licoes: any[] = [];
  
  ionViewWillEnter() {
    this.carregarDados();
  }

  async botaoClicado(id: number){

    this.databaseService.updateStatus(1,id)
    this.clicado = true
    console.log(this.clicado)

    let botaotoggle = document.getElementById('toggle') as HTMLIonToggleElement;

    if(this.clicado == true){
      botaotoggle.checked = true;
      this.isChecked = true;
    }

    setTimeout(() => {
      this.carregarDados();
  }, 750);
    
  }

async carregarDados() {

  try {
    this.licoes = await this.databaseService.getItemByConcluido(0);
  } catch (error) {
    console.error('Erro ao consultar itens:', error);
  }
  }

}