import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

type nextTetriminoTweenType = { opacity: number };

export function newTetriminoTween(tetriminoContainer: PIXI.Container): TWEEN.Tween<nextTetriminoTweenType> {
  const opacity: nextTetriminoTweenType = {
    opacity: 0,
  };

  // let placedAnimationOut = new TWEEN.Tween(position)
  //     .to({y: initialPosition}, 1200)
  //     .easing(TWEEN.Easing.Exponential.Out)
  //     .onUpdate(() => {
  //         boardContainer.position.y = position.y;
  //     });

  // placedAnimationIn.chain(placedAnimationOut);
  return new TWEEN.Tween(opacity).to({ opacity: 1 }, 500).onUpdate(() => {
    tetriminoContainer.alpha = opacity.opacity;
  });
}
