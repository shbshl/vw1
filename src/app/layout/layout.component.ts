import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from './layout.service';
import {Camera} from '../cameras/camera.model';
import {Subscription} from 'rxjs';
import {strict} from 'assert';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  cameraList: Camera[];
  layoutName: string;
  layoutSubscription: Subscription;

  server_response: string;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.cameraList = this.layoutService.getList();
    this.layoutSubscription = this.layoutService.layoutChanged
      .subscribe(
        (newList) => {
          this.cameraList = newList;
          this.layoutName = this.layoutService.layoutName;
          this.server_response = null;
        }
      );
  }

  ngOnDestroy(): void {
    this.layoutSubscription.unsubscribe();
  }

  onDelete(code: string) {
    this.layoutService.deleteFromList(code);
  }

  onSaveLayout() {
    console.log('call onSaveLayout');
    this.layoutService.saveLayout(this.layoutName)
      .subscribe( response => this.server_response = (<{name: string}>response).name.toString());
  }

}
