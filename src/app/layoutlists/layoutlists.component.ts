import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';

import {LayoutListService} from './layout-list.service';
import {Subscription} from 'rxjs';
import {Layout} from './layout.model';

import {LayoutService} from '../layout/layout.service';

@Component({
  selector: 'app-layoutlists',
  templateUrl: './layoutlists.component.html',
  styleUrls: ['./layoutlists.component.css']
})
export class LayoutlistsComponent implements OnInit, OnDestroy {

  layoutList: Layout[];
  layoutSubscription: Subscription;


  constructor(private layoutListService: LayoutListService, private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.layoutListService.getAll().subscribe(data => this.layoutList = data);

    this.layoutSubscription = this.layoutListService.layoutListChanged
      .subscribe(() =>
        this.layoutListService.getAll()
          .subscribe(data => this.layoutList = data)
      );
  }

  ngOnDestroy(): void {
    this.layoutSubscription.unsubscribe();
  }

  onClick(id: string) {
    // console.log('LayoutlistsComponent click');
    this.layoutService.loadLayout(this.layoutListService.loadByid(id));
  }

}
