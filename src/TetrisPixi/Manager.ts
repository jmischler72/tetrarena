import * as PIXI from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container

export class Manager {
  // Safely store variables for our game
  private static app: PIXI.Application;
  private static currentScene: IScene;

  // We no longer need to store width and height since now it is literally the size of the screen.
  // We just modify our getters
  public static get width(): number {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }

  public static get height(): number {
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
  }

  // Use this function ONCE to start the entire machinery
  public static initialize(background: number): void {
    // Create our pixi app
    Manager.app = new PIXI.Application({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window, // This line here handles the actual resize!
      autoDensity: true,
      backgroundColor: background,
    });

    // Add the ticker
    Manager.app.ticker.add(Manager.update);

    // listen for the browser telling us that the screen size changed
    window.addEventListener('resize', Manager.resize);
    // window.addEventListener('resize', Manager.scaleToWindow);

    // call it manually once so we are sure we are the correct size after starting
    Manager.resize();
  }

  public static resize(): void {
    // if we have a scene, we let it know that a resize happened!
    if (Manager.currentScene) {
      Manager.currentScene.resize(Manager.width, Manager.height);
    }
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // Add the new one
    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
    Manager.resize();
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(framesPassed: number): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed);
    }

    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
  }

  // private static scaleToWindow() {
  //   const canvas = Manager.app.view as HTMLCanvasElement;
  //   let scaleX, scaleY, scale, center;
  //   scaleX = window.innerWidth / canvas.offsetWidth;
  //   scaleY = window.innerHeight / canvas.offsetHeight;
  //   scale = Math.min(scaleX, scaleY);
  //   canvas.style.transformOrigin = '0 0';
  //   canvas.style.transform = 'scale(' + scale + ')';
  //   if (canvas.offsetWidth > canvas.offsetHeight) {
  //     if (canvas.offsetWidth * scale < window.innerWidth) {
  //       center = 'horizontally';
  //     } else {
  //       center = 'vertically';
  //     }
  //   } else {
  //     if (canvas.offsetHeight * scale < window.innerHeight) {
  //       center = 'vertically';
  //     } else {
  //       center = 'horizontally';
  //     }
  //   }
  //   let margin;
  //   if (center === 'horizontally') {
  //     margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
  //     canvas.style.marginTop = 0 + 'px';
  //     canvas.style.marginBottom = 0 + 'px';
  //     canvas.style.marginLeft = margin + 'px';
  //     canvas.style.marginRight = margin + 'px';
  //   }
  //   if (center === 'vertically') {
  //     margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
  //     canvas.style.marginTop = margin + 'px';
  //     canvas.style.marginBottom = margin + 'px';
  //     canvas.style.marginLeft = 0 + 'px';
  //     canvas.style.marginRight = 0 + 'px';
  //   }
  //   canvas.style.paddingLeft = 0 + 'px';
  //   canvas.style.paddingRight = 0 + 'px';
  //   canvas.style.paddingTop = 0 + 'px';
  //   canvas.style.paddingBottom = 0 + 'px';
  //   canvas.style.display = '-webkit-inline-box';
  //   return scale;
  // }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends PIXI.DisplayObject {
  update(framesPassed: number): void;

  resize(screenWidth: number, screenHeight: number): void;
}
