import { Component, inject } from '@angular/core';
import { ToolbarTitle } from '../../services/toolbar-title';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { TopBar } from '../top-bar/top-bar';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatIcon,
    TopBar
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  #toolBar = inject(ToolbarTitle)

  constructor() {
    this.#toolBar.updateTitle(this.title)
    this.#toolBar.updateHome(true)
    this.#toolBar.updateLogout(true)
  }

  get menu() {
    return [
      {
        id: 1,
        title: 'Importar Dados',
        backgroundColor: 'transparent',
        icon: 'add',
        link: '/import-data'
      },
      {
        id: 2,
        title: 'Ordens',
        backgroundColor: 'transparent',
        icon: 'order',
        link: '/order'
      }
    ]
  }

  get title() { return 'Início' }

}
