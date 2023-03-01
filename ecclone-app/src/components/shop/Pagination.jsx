import React from "react";
import usePagination from "../customHooks/usePagination";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  let lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  // onPageChange -> set to the correct page number
  const onFirstPage = () => {
    onPageChange(1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onLastPage = () => {
    onPageChange(lastPage);
  };

  return (
    <>
      {/* Page currentPage of totalPageCount */}
      <div className="relative flex py-4 items-center">
        <div className="flex-grow border-t border-[0.5px]"></div>
        <span className="flex-shrink mx-10 text-gray-400 text-xxs tracking-wider">
          Page <span className="mx-1">{currentPage}</span> of{" "}
          <span className="mx-1">{lastPage}</span>
        </span>
        <div className="flex-grow border-t border-[0.5px]"></div>
      </div>

      {/* List of pageRange */}
      <ul className="flex flex-row justify-center items-center cursor-pointer mb-6">
        <li
          onClick={onFirstPage}
          className={`mr-2 ${
            currentPage === 1 ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <MdFirstPage />
        </li>
        {/* Go to previous page */}
        <li
          onClick={onPrevious}
          className={`mr-2 ${
            currentPage === 1 ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <GrFormPrevious />
        </li>

        {/* Show page number */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === ".") {
            return <li key={index}>&#8230;</li>;
          }

          return (
            <li
              className={`border-[1px] text-xxs rounded mr-2 w-6 h-6 leading-6 text-center ${
                index + 1 === currentPage ? "border-black" : ""
              }`}
              key={index}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

        {/* Go to next page */}
        <li
          onClick={onNext}
          className={`mr-2 ${
            currentPage === lastPage ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <GrFormNext />
        </li>

        {/* Go to last page */}
        <li
          onClick={onLastPage}
          className={`${
            currentPage === lastPage ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <MdLastPage />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
