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

  const scoreAnimationIn = new TWEEN.Tween(scoreTextValues).to({ x: 1.4, y: 1.4, rotation: -0.2 }, 100).onUpdate(() => {
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
