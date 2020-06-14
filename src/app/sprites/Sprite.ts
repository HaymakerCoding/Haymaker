import { BoundingBox } from './BoundingBox';
import { GameDemoComponent } from '../game-demo/game-demo.component';

export abstract class Sprite {

  public x;
  public y;
  public width;
  public height;
  public frame;
  public frameSkip;
  public image: HTMLImageElement;
  public ctx: CanvasRenderingContext2D;
  public abstract animations;
  public deviceWidth;
  public deviceHeight;
  public abstract state;
  public abstract scale;
  public abstract jumpStart;
  public abstract maxJump;
  public abstract bodyBox: BoundingBox;
  public abstract health: number;
  public abstract maxHealth: number;

  constructor(x, y, ctx, deviceWidth, deviceHeight) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.frameSkip = 0;
    this.ctx = ctx;
    this.deviceWidth = deviceWidth;
    this.deviceHeight = deviceHeight;
  }

  abstract loadImages();

  abstract update();

  abstract updateY();

  abstract updateX();

  abstract draw();

  abstract resetState(state);

  abstract setImage();

  setWithAndHeight() {
    if (this.image) {
      this.width = this.image.width / this.scale;
      this.height = this.image.height / this.scale;
    } else {
      console.log('no image found, state: ' + this.state);
    }
  }

  abstract getMaxFrames();

  abstract getMaxFrameSkip();

}



