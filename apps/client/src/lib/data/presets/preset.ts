import { ActionsEnum } from '@jmischler72/core';

export type Preset = {
  name: string;
  keys: { [key in ActionsEnum]: string };
};
