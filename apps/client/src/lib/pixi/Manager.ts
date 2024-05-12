import * as PIXI from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container

export class Manager {
	private static app: PIXI.Application;
	private static currentScene: IScene | null;

	private static background = 0x1a1a1a;

	public static get width(): number {
		return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}

	public static get height(): number {
		return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	}

	public static initialize(scene: IScene): void {
		Manager.app = new PIXI.Application({
			view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
			resolution: window.devicePixelRatio || 1,
			resizeTo: window,
			autoDensity: true,
			backgroundColor: this.background,
		});

		Manager.currentScene = scene;
		Manager.app.stage.addChild(Manager.currentScene);

		Manager.app.ticker.add(Manager.update);

		window.addEventListener('resize', Manager.resize);

		Manager.resize();
	}

	public static resize(): void {
		if (Manager.currentScene) {
			Manager.currentScene.resize(Manager.width, Manager.height);
		}
	}

	public static changeScene(newScene: IScene): void {
		if (Manager.currentScene) {
			Manager.app.stage.removeChild(Manager.currentScene);
			Manager.currentScene.destroy();
		}

		Manager.currentScene = newScene;
		Manager.app.stage.addChild(Manager.currentScene);
		Manager.resize();
	}

	// This update will be called by a pixi ticker and tell the scene that a tick happened
	private static update(): void {
		if (Manager.currentScene) {
			Manager.currentScene.update(Manager.app.ticker.deltaMS);
		}
	}

	public static destroy(): void {
		Manager.currentScene?.destroy();
		Manager.currentScene = null;
	}
}

export interface IScene extends PIXI.DisplayObject {
	update(framesPassed: number): void;

	resize(screenWidth: number, screenHeight: number): void;
}
