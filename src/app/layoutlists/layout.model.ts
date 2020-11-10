export class Layout {
  public id: string;
  public name: string;
  public cameras: string[];

  constructor(id: string, name: string, cameras: string[]) {
    this.id = id;
    this.name = name;
    this.cameras = cameras;
  }
}
