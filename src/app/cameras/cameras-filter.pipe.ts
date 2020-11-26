import { Pipe, PipeTransform } from '@angular/core';
import {Camera} from './camera.model';

@Pipe({
  name: 'camerasFilter'
})
export class CamerasFilterPipe implements PipeTransform {

  transform(cameras: Camera[], search: string): Camera[] {
    if (!search.trim()) {
      return cameras;
    }


    return cameras.filter(camera => {
      return camera.NAME.toLowerCase().indexOf(search.toLowerCase()) !==-1 || camera.CODE.toLowerCase().indexOf(search.toLowerCase()) !==-1
    });
  }

}
