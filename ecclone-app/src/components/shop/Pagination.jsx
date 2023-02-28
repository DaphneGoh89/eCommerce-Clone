import React from "react";
import usePagination from "../customHooks/usePagination";
import { MdExpandLess } from "react-icons/md";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex flex-row justify-center items-center cursor-pointer">
      {/* Go to previous page */}
      <li
        onClick={onPrevious}
        className={`${
          currentPage === 1 ? "pointer-events-none opacity-30" : ""
        }`}
      >
        <MdExpandLess className="-rotate-90" />
      </li>

      {/* Show page number */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === ".") {
          return <li key={index}>&#8230;</li>;
        }

        return (
          <li key={index} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}

      {/* Go to next page */}
      <li onClick={onNext}>
        <MdExpandLess className="rotate-90" />
      </li>
    </ul>
  );
};

export default Pagination;

// total_count
// current_page
// page_size
// onPageChange
// sibling_count
// className

// 1. calculate total page count (Math.ceil(total_count / page_size))
