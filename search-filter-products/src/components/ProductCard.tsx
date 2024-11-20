// types
interface ProductCardPropsType {
  id: string;
  title: string;
  image: string;
  price: number;
}

// Link
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, image, price }: ProductCardPropsType) => {
  return (
    <Link
      to={`/product/${id}`}
      className="p-4 bg-gray-50 rounded-md flex flex-col gap-2 border border-gray-100"
    >
      {/* change with a Link Later */}
      <img
        src={image}
        alt={title}
        className="w-full rounded-md h-32 object-cover"
      />
      <h3 className="text-lg font-medium leading-tight h-12">{title}</h3>
      <p className="text-mutedBlack/55 text-xs">${price}</p>
    </Link>
  );
};

export default ProductCard;
