export interface GuardsDemoModel {
  name: string;
  email: string;
  address: string;
  options: DemoOption[];
}

export interface DemoOption {
  id: number;
  name: string;
  selected: boolean;
}
