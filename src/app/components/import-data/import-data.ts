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
      if (file.type !== 'text/csv') {
        alert('Por favor, selecione um arquivo .csv');
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

  processFileContent(content: string) {
    this.tableData = content
      .split('\n')
      .filter(row => row.trim() !== '')
      .reduce((acc: Order[], prev) => {
        const el = prev.split(',')
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
        return acc
      }, [])
  }

  setNewQtdDaily(row: Order, qtdDaily: number | string) {
    const element = this.tableData.find(element => element.idClientProduct === row.idClientProduct)
    if(element) { element.qtdDaily = Number(qtdDaily) }
  }

  setNewQtdDelivery(row: Order, qtdDelivery: number | string) {
    const element = this.tableData.find(element => element.idClientProduct === row.idClientProduct)
    if(element) { element.qtdDelivery = Number(qtdDelivery) }
  }

  setNewClientCommentary(row: Order, clientCommentary: string) {
    const element = this.tableData.find(element => element.idClientProduct === row.idClientProduct)
    if(element) { element.clientCommentary = clientCommentary }
  }

  setNewTeCommentary(row: Order, teCommentary: string) {
    const element = this.tableData.find(element => element.idClientProduct === row.idClientProduct)
    if(element) { element.teCommentary = teCommentary }
  }

  async importData() {
    console.log('Dados a serem importados:', this.tableData);
    // const response = await firstValueFrom(this.#fetch.post(this.tableData))
    // if((response as GenericPostResponse).message) {
    //   const message = (response as GenericPostResponse).message
    //   this.#dialog.open({ title: 'Alerta', message })
    // }
    await this.#router.navigate(['/home'])
  }

  get title() { return 'Importar Dados' }
}
