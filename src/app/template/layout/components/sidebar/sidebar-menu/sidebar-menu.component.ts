import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  role: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.role = parseInt(sessionStorage.getItem('role') ?? '0'); 
  }

}
