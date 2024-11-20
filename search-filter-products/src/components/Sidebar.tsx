import { useEffect, useState } from "react";

// uuid
import { v4 as uuid } from "uuid";

// shaddcn components
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// My hook: useFilter
import { useFilter } from "@/contexts/FilterContext";

// types
interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  //   handlers
  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };
  return (
    <aside className="w-52 h-screen bg-gray-100 flex flex-col p-4 gap-5 fixed">
      <h1 className="text-xl font-serif">Store.</h1>
      {/* search input */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <Input
              type="text"
              placeholder="search product"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          {/* min - max price */}
          <div className="flex items-center justify-center gap-2">
            <Input
              type="number"
              placeholder="min"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(Number(e.target.value));
              }}
            />
            <Input
              type="number"
              placeholder="max"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
              }}
            />
          </div>
        </div>
        {/* categories */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Categories</h2>
          <RadioGroup>
            {categories.map((category) => (
              <div className="flex items-center space-x-2" key={uuid()}>
                <RadioGroupItem
                  value={category}
                  onChange={() => {
                    handleRadioChangeCategories(category);
                  }}
                  checked={selectedCategory === category}
                />
                <Label className="text-mutedBlack/70">
                  {category.toUpperCase()}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* keywords */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Keywords</h2>
          <div className="flex flex-col justify-center gap-2">
            {keywords.map((keyword) => (
              <Button
                variant="outline"
                key={uuid()}
                onClick={() => {
                  handleKeywordChange(keyword);
                }}
              >
                {keyword}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={handleResetFilters}>Reset Filters</Button>
    </aside>
  );
};

export default Sidebar;
