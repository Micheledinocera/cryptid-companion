export interface IIndizio {
  key: string;
  group: number;
  isNot: boolean;
}

export default class Indizio {
  key: string;
  group: number;
  isNot: boolean;

  constructor(data?: IIndizio) {
    this.key = data ? data.key : "";
    this.isNot = data ? data.isNot : false;
    this.group = data ? data.group : 0;
  }
}
