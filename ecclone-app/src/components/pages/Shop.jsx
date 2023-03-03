import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import BreadCrumbs from "../Reusables/BreadCrumbs";
import ProductCard from "../Shop/ProductCard";
import Pagination from "../Shop/Pagination";
import { dummyProduct } from "../Shop/dummyProduct";

const Shop = () => {
  ///////////////
  // navigate to <Product />
  ///////////////
  const navigate = useNavigate();

  const navigateToProduct = (productName) => {
    navigate(`/product/${productName}`);
  };
  ///////////////
  // states
  ///////////////
  let pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  ///////////////
  // useMemo
  ///////////////
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return dummyProduct.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div>
      <BreadCrumbs />
      {/* MAIN PRODUCT SECTION */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-10 mx-auto">
        {currentTableData.map((data, index) => {
          return (
            <ProductCard
              key={index}
              {...data}
              navigateToProduct={navigateToProduct}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={dummyProduct.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Shop;
