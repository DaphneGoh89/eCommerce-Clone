import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgFormatSlash } from "react-icons/cg";

export default function BreadCrumbs() {
  const location = useLocation();

  let currentLink = "";
  let path;
  // Default: append link to <Home /> and <Shop />
  if (location.pathname !== "/shop") {
    path = `home/shop/${location.pathname}`;
  } else {
    path = `home/${location.pathname}`;
  }

  let pathArray = path.split("/").filter((crumb) => crumb !== "");

  // Format crumbs
  const crumbs = pathArray.map((crumb, index) => {
    currentLink = +`${crumb}`;
    return (
      <div
        className={`text-xxs my-2 capitalize flex flex-row justify-center items-center`}
        key={crumb}
      >
        <Link
          to={`${
            crumb === "home" ? "/" : crumb === "shop" ? "/" : currentLink
          }`}
          className="mr-3"
        >
          {crumb.replace(/%20/g, " ")}
        </Link>
        {index !== pathArray.length - 1 ? (
          <CgFormatSlash className="mr-3" />
        ) : (
          ""
        )}
      </div>
    );
  });

  return <div className="flex flex-row mt-3 mb-2">{crumbs}</div>;
}
