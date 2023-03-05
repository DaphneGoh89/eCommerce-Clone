import React from "react";

const FooterSubMenu = ({
  heading,
  subHeadings,
  index,
  showFooterMenu,
  setShowFooterMenu,
}) => {
  return (
    <ul>
      <div
        className={`flex flex-row justify-between items-center py-2 ${
          showFooterMenu === index
            ? ""
            : "border-b-[1px] border-fontLightGrey/50"
        } md:border-b-0 md:w-fit`}
      >
        {/* Heading */}
        <li className="text-fontDarkGrey text-xxs font-bold">
          {heading.toUpperCase()}
        </li>

        {/* Dropdown SVG */}
        <span
          className={`md:hidden ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
            showFooterMenu === index ? "rotate-180" : ""
          }`}
          onClick={() => {
            setShowFooterMenu(index);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="grey"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>
      {/* Expand submenu onClick */}
      <div
        className={`${
          showFooterMenu === index
            ? "block border-b-[1px] border-fontLightGrey/50 py-2 md:py-0"
            : "hidden"
        }
          md:block md:border-b-0`}
      >
        {subHeadings.map((subHeading, index) => {
          return (
            <li
              className="cursor-pointer mb-0.5 fontLightGrey text-xxs"
              key={index}
            >
              {subHeading}
            </li>
          );
        })}
      </div>
    </ul>
  );
};

export default FooterSubMenu;
