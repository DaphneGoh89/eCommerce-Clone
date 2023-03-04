import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import BreadCrumbs from "../Reusables/BreadCrumbs";
import ProductCard from "../Shop/ProductCard";
import Pagination from "../Shop/Pagination";
import { dummyProduct } from "../Shop/dummyProduct";
import { useAxios } from "../CustomHooks/useAxios";

const Shop = () => {
  //-----------------------------------------------------------------------------------------------
  // States
  //-----------------------------------------------------------------------------------------------
  let pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, fetchData } = useAxios();

  //-----------------------------------------------------------------------------------------------
  // useEffect - fetch all products from server
  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    let endpoint = "/product/all";
    let requestOptions = {
      method: "POST",
    };
    fetchData(endpoint, requestOptions);
  }, []);

  //-----------------------------------------------------------------------------------------------
  // onClick of product image -> navigate to <Product /> page
  // * Only product name will be shown in URL
  // * Product code (stored as useLocation state) will be passed into JSON body in the product API call
  //-----------------------------------------------------------------------------------------------
  const navigate = useNavigate();

  const navigateToProduct = (productName, productCode) => {
    navigate(`/product/${productName}`, { state: { productCode } });
  };

  //-----------------------------------------------------------------------------------------------
  // Breadcrumbs - useMemo (runs when dependencies change)
  //-----------------------------------------------------------------------------------------------
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  //-----------------------------------------------------------------------------------------------
  return (
    <div>
      {!loading && data.length > 0 && (
        <>
          <BreadCrumbs />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-10 mx-auto">
            {currentTableData.map((data, index) => {
              return (
                <ProductCard
                  key={data.productCode}
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
        </>
      )}
    </div>
  );
};

export default Shop;
