import { Component, OnInit, ViewChild } from '@angular/core';
import {ADMINISTRATOR_MENUS, APPLICANTS_MENU, CEPAT_MENUS, COORDINATOR_MENUS} from '../../../../shared/menus';
import { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import {AuthService} from '../../../../../modules/auth';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  protected menuItems: any[] = [];

  @ViewChild('notImplementedSwal')
  notImplementedSwal!: SwalComponent;

  notImplementedSwalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    confirmButtonText: "Entendido",
    customClass: {
      confirmButton: "btn btn-primary"
    }
  };

  constructor(
    private authS: AuthService
  ) { }

  ngOnInit(): void {
    const role = this.authS.currentUserValue?.roles[0];

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
      case 4:
        this.menuItems = CEPAT_MENUS;
        break;  
      default:
        break;
    }
  }

  showNotImplementedModal(): void {
    console.log('Not implemented action triggered');
    this.notImplementedSwal.fire();
  }

  protected readonly Array = Array;

  // trackBy para evitar claves duplicadas en ngFor
  trackByMenu(index: number, item: any): any {
    // Preferir un campo único como link; si no existe, combinar name+index
    if (item && item.link) return item.link;
    if (item && item.name) return `${item.name}_${index}`;
    return index;
  }
}
