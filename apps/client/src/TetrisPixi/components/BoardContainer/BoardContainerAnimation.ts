import * as TWEEN from '@tweenjs/tween.js';
import type * as PIXI from 'pixi.js';

type scoreAnimationTweenType = { x: number; y: number; rotation: number };

export function scoreAnimationTween(scoreText: PIXI.Text): TWEEN.Tween<scoreAnimationTweenType> {
  function onValuesUpdate(scoreText: PIXI.Text, scoreTextValues: scoreAnimationTweenType) {
    scoreText.scale.x = scoreTextValues.x;
    scoreText.scale.y = scoreTextValues.y;
    scoreText.rotation = scoreTextValues.rotation;
  }

  const scoreTextValues = {
    x: scoreText.scale.x,
    y: scoreText.scale.y,
    rotation: scoreText.rotation,
  };

  const scoreAnimationIn = new TWEEN.Tween(scoreTextValues).to({ x: 1.6, y: 1.6, rotation: -0.4 }, 100).onUpdate(() => {
    onValuesUpdate(scoreText, scoreTextValues);
  });

  const scoreAnimationOut = new TWEEN.Tween(scoreTextValues)
    .to({ x: 1, y: 1, rotation: 0 }, 1200)
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(() => {
      onValuesUpdate(scoreText, scoreTextValues);
    });

  scoreAnimationIn.chain(scoreAnimationOut);
  return scoreAnimationIn;
}

type placedTetriminosTweenType = { y: number };

export function placedTetriminosTween(
  boardContainer: PIXI.Container,
  initialPosition: number,
  offset: number,
): TWEEN.Tween<placedTetriminosTweenType> {
  const position: placedTetriminosTweenType = {
    y: initialPosition,
  };

  const placedAnimationIn = new TWEEN.Tween(position).to({ y: initialPosition + offset }, 100).onUpdate(() => {
    boardContainer.position.y = position.y;
  });

  const placedAnimationOut = new TWEEN.Tween(position)
    .to({ y: initialPosition }, 1200)
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(() => {
      boardContainer.position.y = position.y;
    });

  placedAnimationIn.chain(placedAnimationOut);
  return placedAnimationIn;
}

type currentPlayerBorderTweenType = { height_multiplier: number; width_multiplier: number; opacity: number };

export function currentPlayerBorderTween(rectangle: PIXI.Graphics): TWEEN.Tween<currentPlayerBorderTweenType> {
  const multiplier: currentPlayerBorderTweenType = {
    height_multiplier: 1.3,
    width_multiplier: 1.6,
    opacity: 1,
  };

  const initial_x = rectangle.x;
  const initial_y = rectangle.y;
  const initial_width = rectangle.width;
  const initial_height = rectangle.height;

  return new TWEEN.Tween(multiplier)
    .delay(200)
    .to(
      {
        height_multiplier: 1,
        width_multiplier: 1,
        opacity: 0.25,
      },
      2000,
    )
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(() => {
      rectangle.alpha = multiplier.opacity;
      rectangle.x = initial_x + (initial_width - initial_width * multiplier.width_multiplier) / 2;
      rectangle.y = initial_y + (initial_height - initial_height * multiplier.height_multiplier) / 2;
      rectangle.width = initial_width * multiplier.width_multiplier;
      rectangle.height = initial_height * multiplier.height_multiplier;
    });
}
