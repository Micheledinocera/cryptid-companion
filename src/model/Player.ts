import Indizio from "./Indizio";

export interface IPlayer {
  nome: string;
  indizi: Indizio[];
}

export default class Player {
  nome: string;
  indizi: Indizio[];

  constructor(data?: IPlayer) {
    this.nome = data ? data.nome : "";
    this.indizi = data ? data.indizi : [];
  }
}
