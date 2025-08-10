import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatFabButton } from "@angular/material/button";
import { Router } from "@angular/router";
// import { FetchOrderService } from "../../services/fetch-order.service";
import { Order } from "../../interfaces/order.interface";
import { MatIcon } from "@angular/material/icon";
import { ToolbarTitle } from "../../services/toolbar-title";
import { TopBar } from "../top-bar/top-bar";
// import { DialogService } from "../../services/dialog.service";

@Component({
  selector: 'app-import-data',
  imports: [CommonModule, MatFabButton, MatIcon, TopBar],
  templateUrl: './import-data.html',
  styleUrl: './import-data.scss'
})
export class ImportData {

  @ViewChild('fileInput') fileInput!: ElementRef;
  tableData: Order[] = [];

  #toolBar = inject(ToolbarTitle)
  // #dialog = inject(DialogService);
  #router = inject(Router);
  // #fetch = inject(FetchOrderService)

  constructor() {
    this.#toolBar.updateTitle(this.title)
    this.#toolBar.updateHome(false)
    this.#toolBar.updateLogout(true)
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Verificar extensão do arquivo ao invés do tipo MIME
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.csv') && !fileName.endsWith('.txt')) {
        alert('Por favor, selecione um arquivo .csv ou .txt');
        return;
      }

      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result as string;
      this.processFileContent(content);
    };
    reader.readAsText(file);
  }

  async importData() {
    console.log('Dados a serem importados:', this.tableData);
    // Código comentado para futura implementação do service
    await this.#router.navigate(['/home'])
  }

  processFileContent(content: string) {
    console.log('Conteúdo do arquivo:', content);

    this.tableData = content
      .split('\n')
      .filter(row => row.trim() !== '')
      .reduce((acc: Order[], prev) => {
        const el = prev.split(',')

        // Verificar se a linha tem pelo menos 8 colunas
        if (el.length >= 8) {
          acc.push({
            idClientProduct: el[0].trim(),
            idTeProduct: el[1].trim(),
            cover: Number(el[2].trim().replace(',', '.')), // Convert comma decimal to dot
            qtdDaily: Number(el[3].trim()),
            description: el[4].trim(),
            clientCommentary: el[5].trim(),
            teCommentary: el[6].trim(),
            qtdDelivery: Number(el[7].trim())
          })
        }
        return acc
      }, [])

    console.log('Dados processados:', this.tableData);
  }

  get title() { return 'Importar Dados' }
}
