import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private databaseService: DatabaseService) {}

  isChecked : boolean = false
  licoes: any[] = [];
  
  ionViewWillEnter() {
    this.carregarDados();
  }

  async botaoClicado(id: number){

    this.databaseService.updateStatus(1,id)
    this.isChecked = true
    console.log(this.isChecked)

    let botaotoggle = document.getElementById('toggle') as HTMLIonToggleElement;

    if(this.isChecked){
      botaotoggle.checked = true;
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
