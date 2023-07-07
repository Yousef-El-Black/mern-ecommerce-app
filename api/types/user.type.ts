export type User = {
  _doc?: any;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id: string;
  img?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewUser = Omit<User, "createdAt" | "updatedAt" | "_id">;
