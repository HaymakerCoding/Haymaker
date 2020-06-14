import { GameDemoComponent } from '../game-demo/game-demo.component';

export class BoundingBox {
  public x;
  public y;
  public width;
  public height;
  public ctx: CanvasRenderingContext2D;
  public backgroundImg: HTMLImageElement;
  public debuggingOn: boolean;

  constructor(x, y, width, height, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.debuggingOn = false;
  }

  setBackgroundImage(src) {
    const img = new Image();
    img.src = src;
    this.backgroundImg = img;
  }

  setDebugging(debuggingOn: boolean) {
    this.debuggingOn = debuggingOn;
  }

  draw() {
    if (this.backgroundImg) {
      this.drawBackgroundImg();
    }
    // draw debgging lines
    if (this.debuggingOn === true) {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.stroke();
    }
  }

  drawBackgroundImg() {
    this.ctx.drawImage(this.backgroundImg, this.x, this.y - 20, this.width, this.height + 20);
  }

  update(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  checkCollision(object1, object2): boolean {
    if (object1.x < object2.x + (object2.width)  && object1.x + (object1.width)  > object2.x &&
      object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      // The objects are touching
        return true;
    } else {
      return false;
    }
  }

}



