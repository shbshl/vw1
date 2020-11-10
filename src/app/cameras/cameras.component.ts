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
  cameraList: Camera[] = [];

  constructor(private cameras_service: CamerasService, private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.cameras_service.getAll().subscribe( cameras => {
      this.cameraList = <Camera[]>(cameras);
    })
  }

  onClick(code:string, index: number) {
    this.layoutService.addToWall(code)
  }
}


