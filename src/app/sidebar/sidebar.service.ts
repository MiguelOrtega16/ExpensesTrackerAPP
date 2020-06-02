import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Expenses Log',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: '',
      route : '/expenses'
    },
    {
      title: 'Settlement',
      icon: 'fa fa-calculator',
      active: false,
      type: 'dropdown',
      route: '/expenses',
      submenus: [
        {
          title: 'Miguel',
          route : 'settlement/user/1'
        },
        {
          title: 'Cata',
          route : 'settlement/user/2'
        },
      ]
    },
    {
      title: 'Items',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'New Products',
          route : 'items/new'
        },
        {
          title: 'View Products',
          route : 'items'
        },
      ]
    },
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
