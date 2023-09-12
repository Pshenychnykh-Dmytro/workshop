export enum ComputerItemNames {
  id = 'id',
  model = 'model',
  series = 'series',
  type = 'type',
  price = 'price'
}

export enum ComputerModelNames {
  id = 'id',
  model = 'model',
  series = 'series',
  hdd = 'HDD',
  memory = 'memory',
  type = 'type',
  price = 'price'
}

export interface ComputerItem {
  [ComputerItemNames.id]: number;
  [ComputerItemNames.model]: string;
  [ComputerItemNames.series]: string;
  [ComputerItemNames.type]: 'laptop' | 'PC';
  [ComputerItemNames.price]: number;
}

export interface ComputerModel {
  [ComputerModelNames.id]: number;
  [ComputerModelNames.model]: string;
  [ComputerModelNames.series]: string;
  [ComputerModelNames.hdd]: number;
  [ComputerModelNames.memory]: number;
  [ComputerModelNames.type]: 'laptop' | 'PC';
  [ComputerModelNames.price]: number;
}
