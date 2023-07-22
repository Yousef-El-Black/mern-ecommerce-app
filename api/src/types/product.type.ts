export type Product = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories?: any;
  size?: any;
  color?: any;
  price: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NewProduct = Omit<Product, "createdAt" | "updatedAt" | "_id">;
