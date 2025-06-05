import { Component, OnInit } from '@angular/core';
import {ADMINISTRATOR_MENUS} from '../../../../shared/menus';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  protected menuItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    const role = parseInt(sessionStorage.getItem('role') ?? '0');

    switch (role) {
      case 1:
        this.menuItems = ADMINISTRATOR_MENUS;
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        this.menuItems = ADMINISTRATOR_MENUS;
        break;
    }
  }

  protected readonly Array = Array;
}
