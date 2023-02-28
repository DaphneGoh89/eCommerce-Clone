import React, { useState, useMemo } from "react";
import BreadCrumbs from "../reusables/BreadCrumbs";
import ProductCard from "../shop/ProductCard";
import Pagination from "../shop/Pagination";

const TestImages = [
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
  {
    product_code: "hy5532-014",
    product_name: "Christal Shoulder Padded Blazer",
    images: ["hy5532-014_msousv0o9urzhxyh", "hy5532-031_3m0vknvnzfzk8mii"],
  },
];

const Shop = () => {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return TestImages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div>
      <BreadCrumbs />
      {/* MAIN PRODUCT SECTION */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-10 mx-auto">
        {currentTableData.map((image, index) => {
          return <ProductCard key={index} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount="20"
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Shop;
