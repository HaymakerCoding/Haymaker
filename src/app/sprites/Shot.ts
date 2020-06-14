import { Sprite } from './Sprite';
import { BoundingBox } from './BoundingBox';

export class Shot extends Sprite {

  public animations;
  public state;
  public scale;
  public jumpStart;
  public maxJump;
  public facing;
  public health: number;
  public maxHealth: number;
  public bodyBox: BoundingBox;
  public rebound: boolean;

  constructor(x, y, ctx, deviceWidth, deviceHeight, state) {
    super(x, y, ctx, deviceWidth, deviceHeight);
    this.y = y;
    this.x = x;
    this.scale = 5;
    this.rebound = false;
    this.state = state;
    this.bodyBox = new BoundingBox(this.x, this.y, this.width, this.height, this.ctx);
    this.loadImages();
  }

  resetState(state) {
    this.frame = 0;
    this.frameSkip = 0;
    this.state = state;
  }

  loadImages() {
    this.animations = {
      chargeLeft: [],
      chargeRight: [],
      flyLeft: [],
      flyRight: []
    };
    let imgs: HTMLImageElement[] = [];
    let img = new Image();
    img.src = '../../assets/animations/player-shot/left/blue_fb_0.png';
    imgs.push(img);
    img = new Image();
    img.src = '../../assets/animations/player-shot/left/blue_fb_1.png';
    imgs.push(img);
    this.animations.chargeLeft = imgs;
    this.animations.flyLeft = imgs;

    imgs = [];
    img = new Image();
    img.src = '../../assets/animations/player-shot/right/blue_fb_0.png';
    imgs.push(img);
    img = new Image();
    img.src = '../../assets/animations/player-shot/right/blue_fb_1.png';
    imgs.push(img);
    this.animations.chargeRight = imgs;
    this.animations.flyRight = imgs;


  }

  draw() {
    this.setImage();
    this.setWithAndHeight();
    if (this.image) {
      this.ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    this.bodyBox.draw();
  }

  update() {
    this.updateX();
    this.updateY();
    if (this.frame < this.getMaxFrames()) {
      if (this.frameSkip < this.getMaxFrameSkip()) {
        this.frameSkip++;
      } else {
          this.frameSkip = 0;
          this.frame++;
      }
    } else {
      this.frame = 0;
    }
    this.bodyBox.update(this.x, this.y, this.width, this.height);

  }

  updateY() {
      if (this.height) {

      }
  }

  updateX() {
    if (this.state === SHOT_STATE.FLY_LEFT) {
      this.x -= 8;
    } else if (this.state === SHOT_STATE.FLY_RIGHT) {
      this.x += 8;
    }
  }

  setImage() {
    switch (this.state) {
      case SHOT_STATE.CHARGE_LEFT: {
        this.image = this.animations.chargeLeft[this.frame];
        break;
      }
      case SHOT_STATE.CHARGE_RIGHT: {
        this.image = this.animations.chargeRight[this.frame];
        break;
      }
      case SHOT_STATE.FLY_LEFT: {
        this.image = this.animations.flyLeft[this.frame];
        break;
      }
      case SHOT_STATE.FLY_RIGHT: {
        this.image = this.animations.flyRight[this.frame];
        break;
      }

    }

  }

  getMaxFrames() {
    return 1;
  }

  getMaxFrameSkip() {
    return 6;
  }

}

interface Animations {
  chargeLeft: HTMLImageElement[];
  chargeRight: HTMLImageElement[];
  flyRight: HTMLImageElement[];
  flyLeft: HTMLImageElement[];
}

export enum SHOT_STATE {
  CHARGE_RIGHT = 'charge-right',
  CHARGE_LEFT = 'charge-left',
  FLY_LEFT = 'fly-left',
  FLY_RIGHT = 'fly-right'
}



