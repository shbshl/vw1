import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventEmitter} from '@angular/core';

import {CamerasService} from '../cameras/cameras.service';
import {Camera} from '../cameras/camera.model';
import {LayoutListService} from '../layoutlists/layout-list.service';
import {Observable} from 'rxjs';
import {Layout} from '../layoutlists/layout.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  cameraList: Camera[] = [];
  layoutName: string;
  layoutChanged = new EventEmitter<Camera[]>();

  URL = 'https://videowall-ttk.firebaseio.com/layouts.json';


  constructor(private http: HttpClient,
              private cameraService: CamerasService,
              private layoutListService: LayoutListService) {
  }

  addToWall(code: string) {
    this.cameraService.getByCode(code).subscribe(camera => {
      this.cameraList.push(camera);
      this.layoutChanged.emit(this.cameraList.slice());
    });
  }

  getList() {
    return this.cameraList.slice();
  }

  deleteFromList(code: string) {
    this.cameraList = this.cameraList.filter(camera => camera.CODE != code);
    this.layoutChanged.emit(this.cameraList.slice());
  }

  saveLayout(name: string) {
    console.log('saveLayout in LayoutService');
    this.layoutName = name;
    return this.layoutListService.saveLayout(name,this.cameraList.slice( ));
  }

  loadLayout(layout: Observable<Layout>) {
    layout.subscribe(layout => {

      this.cameraList = [];
      for (let code of layout.cameras) {
        this.addToWall(code)
      }

      this.layoutName = layout.name;
      this.layoutChanged.emit(this.cameraList.slice());

    })

  }
}
