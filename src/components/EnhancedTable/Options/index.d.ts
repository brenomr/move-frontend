export interface IOption {
  type: 'link' | 'button';
  name: string;
  icon: JSX.Element;
  link?: string;
  handle: (rowId: string | null) => any;
  id?: string;
}

export interface IOptions {
  id: string;
  options: IOption[]
}