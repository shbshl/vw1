import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CamerasService} from '../cameras/cameras.service';

import {Camera} from '../cameras/camera.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Layout} from './layout.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutListService {

  layoutList: Layout[];
  layoutListChanged = new EventEmitter();

  URL = 'https://videowall-ttk.firebaseio.com/layouts.json';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Layout[]> {
    return this.http.get(this.URL)
      .pipe(
        map(responseData => {
          const layouts = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              layouts.push({...responseData[key], id: key});
            }
          }
          return (layouts as Layout[]);
        })
      );
  }

  saveLayout(name: string, cameraList: Camera[]) {
    let layout = {
      'name': name,
      'cameras': cameraList.map(camera => camera.CODE)
    };
    let res = this.http.post(this.URL, layout);

    this.getAll().subscribe(
      layouts => {
        this.layoutList = layouts;
        this.layoutListChanged.emit();
      }
    );
    //res.subscribe((resp) => console.log(resp));

    return res;
  }

  loadByid(id: string): Observable<Layout> {
    return (this.http.get('https://videowall-ttk.firebaseio.com/layouts/' + id + '.json') as Observable<Layout>);
  }
}


