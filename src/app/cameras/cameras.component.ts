import {Component, OnInit} from '@angular/core';
import {Camera} from './camera.model';
import {CamerasService} from './cameras.service';
import {LayoutService} from '../layout/layout.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

  constructor(public camerasService: CamerasService, private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.camerasService.getAll()
      .subscribe();
  }

  onClick(code: string, index: number) {
    this.layoutService.addToWall(code);
  }


}


