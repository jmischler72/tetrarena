import { ActionsEnum } from '../../../../core-tetris/src';

export const joff_preset: Map<ActionsEnum, string> = new Map<ActionsEnum, string>([
  [ActionsEnum.GO_DOWN, 'ArrowDown'],
  [ActionsEnum.GO_LEFT, 'ArrowLeft'],
  [ActionsEnum.GO_RIGHT, 'ArrowRight'],
  [ActionsEnum.ROTATE, 'Space'],
  [ActionsEnum.INSTANT_PLACE, 'LeftShift'],
]);