import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// shadcn components
import { Button } from "@/components/ui/button";

// uuid
import { v4 as uuid } from "uuid";

// icons
import { Star } from "lucide-react";

// types
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  // routing
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // states
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.images[0]
  );

  const url = `https://dummyjson.com/products/${id}`;

  // get data
  useEffect(() => {
    if (id) {
      axios
        .get<Product>(url)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((err) => {
          console.error(
            `Error fetching the product ${id} data ==WHY==> ${err}`
          );
        });
    }
  }, [id]);

  if (!product)
    return (
      <div className="w-full h-screen flex items-center justify-center pl-56">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  return (
    <div className="pl-56 py-4 flex flex-col gap-4">
      <Button
        className="w-fit"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      {/* product */}
      <div className="flex items-center gap-6">
        {/* images */}
        <img
          src={selectedImage ? selectedImage : product.images[0]}
          alt={product.title}
          className="w-64 object-cover"
        />
        <div className="flex flex-col gap-1">
          {product.images.map((image) => (
            <img
              src={image}
              alt={product.title}
              key={uuid()}
              className="h-36 object-cover border border-gray-200 rounded-md"
              onClick={() => {
                setSelectedImage(image);
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-xl">{product.title}</h1>
        <p className="tracking-tighter text-mutedBlack/65">
          {product.description}
        </p>
      </div>
      <span className="flex items-center font-medium gap-1">
        <Star size={18} />
        {product.rating}
      </span>
      <h2 className="text-lg py-1 px-3 rounded-md bg-mutedBlack/10 w-fit self-end">
        ${product.price}
      </h2>
    </div>
  );
};

export default ProductPage;
