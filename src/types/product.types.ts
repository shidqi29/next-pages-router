export type ProductCardProps = {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
};

export type ProductListProps = {
  data: {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
  }[];
};
