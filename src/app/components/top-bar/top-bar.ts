import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { ToolbarTitle } from '../../services/toolbar-title';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, RouterLink, MatIcon, MatIconButton],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBar {

  #toolBar = inject(ToolbarTitle)

  get toolBarTitle() { return this.#toolBar.title }

  get home() { return this.#toolBar.home }

  get logout() { return this.#toolBar.logout }

}
