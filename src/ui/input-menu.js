export class InputMenu{
  constructor(){
  }
  moveUp(options, hovered){
    this.hovered = (this.hovered + 1) % options.length();
  }
  moveDown(options, hovered){
    this.hovered = (this.hovered - 1) % options.length();
  }
}
