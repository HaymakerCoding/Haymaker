import { Sprite } from './Sprite';
import { BoundingBox } from './BoundingBox';

export class Slime extends Sprite {

  public color: SLIME_COLOR;
  public animations: Animations;
  public state: STATE;
  public scale;
  public randomBehaviour: boolean;
  public bodyBox: BoundingBox;
  public jumpStart;
  public maxJump;
  public loaded: boolean;
  public health: number;
  public maxHealth: number;
  public remove: boolean;
  public power: number;
  public ground: BoundingBox;
  public currentWalkDirection;

  constructor(x, y, ctx, deviceWidth, deviceHeight, ground, color) {
    super(x, y, ctx, deviceWidth, deviceHeight);
    this.currentWalkDirection = 'right';
    this.loaded = false;
    this.color = color;
    this.state = STATE.EMERGE;
    this.remove = false;
    this.scale = 4;
    this.ground = ground;
    this.health = 100;
    this.power = 20;
    this.maxHealth = 160;
    this.randomBehaviour = true;
    this.bodyBox = new BoundingBox(this.x, this.y, this.width, this.height, this.ctx);
    this.loadImages();
  }

  loadImages() {
    this.animations = {
      walkLeft: [], walkRight: [], look: [], think: [], sneeze: [], emerge: [], happy: [], laugh: [],
      hurt: [], die: []
    };
    this.loadWalkImages();
    this.loadLookImages();
    this.loadThinkImages();
    this.loadSneezeImages();
    this.loadEmergeImages();
    this.loadHappyImages();
    this.loadLaughImages();
    this.loadHurtImages();
    this.loadDieImages();
    this.loaded = true;
  }

  resetState(state) {
    this.frame = 0;
    this.frameSkip = 0;
    this.state = state;
  }

  loadHurtImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 11; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/hurt/hurt_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.hurt = imgs;
  }

  loadDieImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 13; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/die/die_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.die = imgs;
  }

  loadLaughImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 69; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/laugh/laugh_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.laugh = imgs;
  }

  loadHappyImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 45; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/happy/happy_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.happy = imgs;
  }

  loadEmergeImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 33; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/emerge/emerge_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.emerge = imgs;
  }

  loadSneezeImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 25; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/sneeze/sneeze_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.sneeze = imgs;
  }

  loadLookImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 71; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/look/look_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.look = imgs;
  }

  loadThinkImages() {
    const imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 63; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/think/think_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.think = imgs;
  }

  loadWalkImages() {
    let imgs: HTMLImageElement[] = [];
    for (let x = 0; x < 28; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/move-right/jump_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.walkRight = imgs;
    imgs = [];
    for (let x = 0; x < 28; x++) {
      const img = new Image();
      img.src = '../../assets/animations/slime/' + this.color + '/move-right/jump_' + x.toString().padStart(2, '0') + '.png';
      imgs.push(img);
    }
    this.animations.walkLeft = imgs;
  }

  /**
   * reduce slime health by x amount
   * @param health health to remove;
   */
  decreaseHealth(health) {
    this.health -=  health;
    this.scale = this.scale / (this.health / 100);
    if (this.health <= 0) {
      this.resetState(STATE.DIE);
      this.randomBehaviour = false;
    }
  }

  increaseHealth(health) {
    if (this.health < this.maxHealth) {
      this.health += health;
      if (this.health > this.maxHealth) {
        this.health = this.maxHealth;
      }
      this.scale = this.scale / (this.health / 100);
    }
  }

  update() {
    if (this.loaded === true) {
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
        if (this.state === STATE.DIE) {
          this.remove = true;
        } else {
          this.state = this.getRandomState();
          this.frame = 0;
        }
      }
      this.bodyBox.update(this.x, this.y, this.width, this.height);
    }
  }

  getRandomState(): STATE {
    const num = Math.floor((Math.random() * 10) + 1); // random number between 1-10
    if (num < 8) {
      return this.currentWalkDirection === 'right' ? STATE.WALK_RIGHT : STATE.WALK_LEFT;
    }  else {
      return this.getRandomAction();
    }
  }

  getRandomAction(): STATE {
    const num = Math.floor((Math.random() * 10) + 1); // random number between 1-10
    if (num < 4) {
      return STATE.LOOK;
    } else if (num < 7) {
      return STATE.THINK;
    } else if (num < 9) {
      return STATE.HAPPY;
    } else {
      return STATE.SNEEZE;
    }
  }

  /**
   * Update the y position of the sprite based on any conditions/state
   */
  updateY() {
    if (this.image) {
      this.y = (this.deviceHeight - this.height);
    }
    if (this.ground && this.y > (this.ground.y - this.height)) {
      this.y = this.ground.y - this.height;
    }
  }

  /**
   * Update the x position of the sprite based on any conditions/state
   */
  updateX() {
    switch (this.state) {
      case STATE.WALK_RIGHT: {
        if (this.x < (this.deviceWidth - this.width)) {
          this.x += 1;
        } else {
          this.currentWalkDirection = 'left';
          this.state = STATE.WALK_LEFT;
        }
        break;
      }
      case STATE.WALK_LEFT: {
        if (this.x > 110) {
          this.x -= 1;
        } else {
          this.currentWalkDirection = 'right';
          this.state = STATE.WALK_RIGHT;
        }
        break;
      }
    }
  }

  draw() {
    if (this.loaded === true) {
      this.setImage();
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
  }

  setImage() {
    switch (this.state) {
      case STATE.WALK_LEFT: {
        this.image = this.animations.walkLeft[this.frame];
        break;
      }
      case STATE.WALK_RIGHT: {
        this.image = this.animations.walkRight[this.frame];
        break;
      }
      case STATE.LOOK: {
        this.image = this.animations.look[this.frame];
        break;
      }
      case STATE.THINK: {
        this.image = this.animations.think[this.frame];
        break;
      }
      case STATE.SNEEZE: {
        this.image = this.animations.sneeze[this.frame];
        break;
      }
      case STATE.EMERGE: {
        this.image = this.animations.emerge[this.frame];
        break;
      }
      case STATE.HAPPY: {
        this.image = this.animations.happy[this.frame];
        break;
      }
      case STATE.LAUGH: {
        this.image = this.animations.laugh[this.frame];
        break;
      }
      case STATE.HURT: {
        this.image = this.animations.hurt[this.frame];
        break;
      }
      case STATE.DIE: {
        this.image = this.animations.die[this.frame];
        break;
      }
      default: alert('no state set'); break;
    }
    this.setWithAndHeight();

  }

  getMaxFrames() {
    if (this.state === STATE.WALK_LEFT || this.state === STATE.WALK_RIGHT) {
      return 27;
    } else if (this.state === STATE.LOOK) {
      return 70;
    } else if (this.state === STATE.THINK) {
      return 62;
    } else if (this.state === STATE.SNEEZE) {
      return 24;
    } else if (this.state === STATE.EMERGE) {
      return 32;
    } else if (this.state === STATE.HAPPY) {
      return 44;
    } else if (this.state === STATE.LAUGH) {
      return 68;
    } else if (this.state === STATE.HURT) {
      return 10;
    } else if (this.state === STATE.DIE) {
      return 12;
    }

  }

  getMaxFrameSkip() {
    if (this.state === STATE.WALK_LEFT || this.state === STATE.WALK_RIGHT) {
      return 0;
    } else {
      return 0;
    }
  }

}

interface Animations {
  walkLeft: HTMLImageElement[];
  walkRight: HTMLImageElement[];
  look: HTMLImageElement[];
  think: HTMLImageElement[];
  sneeze: HTMLImageElement[];
  emerge: HTMLImageElement[];
  happy: HTMLImageElement[];
  laugh: HTMLImageElement[];
  hurt: HTMLImageElement[];
  die: HTMLImageElement[];
}

export enum STATE {
    WALK_LEFT = 'walk-left',
    WALK_RIGHT = 'walk-right',
    LOOK = 'look',
    THINK = 'think',
    SNEEZE = 'sneeze',
    EMERGE = 'emerge',
    HAPPY = 'happy',
    LAUGH = 'laugh',
    HURT = 'hurt',
    DIE = 'die'
}

export enum SLIME_COLOR {
  GREEN = 'green',
  ORANGE = 'orange',
  PURPLE = 'purple',
  BLUE = 'blue'
}
