export interface UserItemModel {
  id: number;
  name: string;
}

export interface UserModel extends UserItemModel {
  email: string;
  age: number
  gender: 'male' | 'female' | 'other';
  selected?: boolean;
}
