import { Component, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-page-description-details',
  templateUrl: './page-description-details.component.html',
  styleUrls: ['./page-description-details.component.scss']
})
export class PageDescriptionDetailsComponent {

  @Input() SectionTitle : string;
  @Input() SectionDescription : string;
  constructor(public sidebarservice: SidebarService) { }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
