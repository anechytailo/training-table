export interface Person {
  id?: string;
  userId?: string;
  name: string;
  age: number;
}

export interface EditProps {
  user: Person;
  onClose: () => void;
}
