export interface IPerson {
  id?: string;
  userId: string;
  name: string;
  age: number;
}

export interface EditUserProps {
  user: IPerson;
  onClose: () => void;
}

export interface AddUserProps {
  onClose: () => void;
}

interface TableCol {
  field: string;
  headerName: string;
  width: number;
  editable?: boolean;
}
export interface UserTable {
  usertData: {
    renderTable: boolean;
    columns: TableCol[];
    rows: IPerson[];
  };
}
