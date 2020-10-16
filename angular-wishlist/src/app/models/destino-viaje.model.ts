export class DestinoViaje {
  private selected: boolean;
  public servicios: string[];

  constructor(public nombre: string, public imgURL: string, public votes: number = 0){
    this.servicios = ['baño', 'desayuno'];
    this.selected = false;
  }
  isSelected(): boolean {
    return this.selected;
  }
  setSelected(s: boolean): void {
    this.selected = s;
  }
  voteUp(): void {
    this.votes++;
  }
  voteDown(): void {
    this.votes--;
  }
}
