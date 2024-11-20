import { useFilter } from "@/contexts/FilterContext";
import { useEffect, useState } from "react";

// shadcn components
import { Button } from "@/components/ui/button";

// import icons
import { Filter } from "lucide-react";
// axios
import axios from "axios";
// my components
import ProductCard from "./ProductCard";

// uuid
import { v4 as uuid } from "uuid";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  // states
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [dropDown, setDropDown] = useState<boolean>(false);

  const productsPerPage = 12;

  //   get data
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
      (currentPage - 1) * productsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        // console.log(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  //   handler : pagination

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationNumbers = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <div className="pl-56 py-4">
      <div className="relative">
        <Button
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          <Filter />
          {filter === "all"
            ? "Filter"
            : filter.charAt(0).toLowerCase() + filter.slice(1)}
        </Button>

        {dropDown && (
          <div className="absolute w-28 mt-2 bg-mutedBlack/10 flex flex-col items-center p-4 rounded-md gap-2 z-20">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                setFilter("cheap");
                setDropDown(!dropDown);
              }}
            >
              Cheap
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                setFilter("expensive");
                setDropDown(!dropDown);
              }}
            >
              Expensive
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                setFilter("popular");
                setDropDown(!dropDown);
              }}
            >
              Popular
            </Button>
          </div>
        )}
      </div>
      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {/* each product */}
        {filteredProducts.map((product) => (
          <ProductCard
            key={uuid()}
            id={product.id}
            title={product.title}
            image={product.thumbnail}
            price={product.price}
          />
        ))}
      </div>

      {/* pagination */}
      <div className="w-full flex items-center justify-between gap-2 mt-4">
        <Button
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {/* pagination page numbers */}
        <div className="flex items-center gap-1">
          {getPaginationNumbers().map((pageNumber) => (
            <Button
              className="rounded-full size-8"
              key={uuid()}
              onClick={() => {
                handlePageChange(pageNumber);
              }}
              variant={pageNumber === currentPage ? "default" : "outline"}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MainContent;
