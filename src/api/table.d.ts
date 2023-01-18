export interface Person {
  id?: string;
  userId?: string;
  name: string;
  age: number;
}

export interface EditUserProps {
  user: Person;
  onClose: () => void;
}

export interface AddUserProps {
  onClose: () => void;
}
