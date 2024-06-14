export type TSubMenus = {
  id: number;
  label: string;
  href: string;
};

export type TMenu = {
  id: number;
  icon?: React.ReactNode;
  label: string;
  href: string;
  subMenus?: TSubMenus[];
};

export type TZodError = {
  name: string;
  message: string;
};

export type ColumnSort = {
  id: string;
  desc: boolean;
};

export type SortingState = ColumnSort[];

export type TResponse = {
  success?: boolean;
  message?: string;
  error?: TZodError[];
};

export type TGettersProps = {
  take: number;
  skip: number;
  sort: string;
  order: string;
  page: number;
  search: string;
};

export type TType = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};
