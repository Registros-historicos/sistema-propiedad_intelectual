import { Component, OnInit } from '@angular/core';
import {ADMINISTRATOR_MENUS, APPLICANTS_MENU, COORDINATOR_MENUS} from '../../../../shared/menus';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  protected menuItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    const role = parseInt(localStorage.getItem('role') ?? '0');

    switch (role) {
      case 1:
        this.menuItems = ADMINISTRATOR_MENUS;
        break;
      case 2:
        this.menuItems = COORDINATOR_MENUS;
        break;
      case 3:
        this.menuItems = APPLICANTS_MENU;
        break;
      default:
        break;
    }
  }

  protected readonly Array = Array;
}
