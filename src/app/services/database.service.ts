import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db!: SQLiteObject;

  constructor(private sqlite: SQLite) { 
    this.createDatabase().then((db) => {
      this.db = db;
      this.createTable();
    }).catch((error) => {
      console.error('Erro ao criar banco de dados:', error);
    });
  }

  createDatabase(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'Licao.db',
      location: 'default'
    });
  }
  
  createTable(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS Lição (idLicao INTEGER PRIMARY KEY AUTOINCREMENT, Professor TEXT NOT NULL, Materia TEXT NOT NULL, Conteudo TEXT NOT NULL, Dificuldade TEXT NOT NULL, Concluida BOOLEAN NOT NULL)')
      .then(() => console.log('Tabela Lição criada com sucesso'))
      .catch(error => console.error('Erro ao criar tabela Lição:', error));
  }

  getAllItems(): Promise<any> {
    return this.db.executeSql('SELECT * FROM Lição', []).then(data => {
      let items = [];
      for (let i = 0; i < data.rows.length; i++) {
        items.push(data.rows.item(i));
      }
      return items;
    });
  }

  getItemByConcluido(numero: number): Promise<any[]> {
    return this.db.executeSql('SELECT * FROM Lição WHERE Concluida = ?', [numero]).then(data => {
      let lições = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          lições.push(data.rows.item(i));
        }
      }
      return lições;
    });
  }

  addItem(Professor: string, Materia: string, Conteudo: string, Dificuldade: string): Promise<void> {
    return this.db.executeSql('INSERT INTO Lição (Professor, Materia, Conteudo, Dificuldade, Concluida) VALUES (?, ?, ?, ?, 0)', [Professor, Materia, Conteudo, Dificuldade])
      .then(() => console.log("Item inserido com sucesso"))
      .catch(error => console.error('Erro ao inserir dados no banco de dados:', error));
  }

  updateItem(id: number, Professor: string, Materia: string, Conteudo: string, Dificuldade: string): Promise<void> {
    return this.db.executeSql('UPDATE Lição SET Professor = ?, Materia = ?, Conteudo = ?, Dificuldade = ? WHERE idLicao = ?', [Professor, Materia, Conteudo, Dificuldade, id])
      .then(() => console.log("Item atualizado com sucesso"))
      .catch(error => console.error('Erro ao atualizar item no banco de dados:', error));
  }

  updateStatus(Concluida: number, id: number): Promise<void> {
    return this.db.executeSql('UPDATE Lição SET Concluida = ? WHERE idLicao = ?', [Concluida, id])
  }

  deleteItem(id: number): Promise<void> {
    return this.db.executeSql('DELETE FROM Lição WHERE idLicao = ?', [id])
      .then(() => console.log("Item deletado com sucesso"))
      .catch(error => console.error('Erro ao deletar item do banco de dados:', error));
  }
}