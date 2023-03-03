import React from "react";

function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

const ProductCart = () => {
  return (
    <>
      <div className="text-xxs flex flex-row space-x-3 pt-4 border-t-[1px] border-fontDarkGrey/30">
        <img
          src={getImageUrl("hy5532-014_msousv0o9urzhxyh")}
          className="w-28 aspect-auto"
        ></img>

        <div className="flex-grow flex flex-row justify-between items-start space-x-3">
          <div className="flex-grow md:flex md:flex-row md:justify-between">
            <div className="md:flex-grow sm:w-full">
              <p>Shirlene High Waist Shorts</p>
              <p className="mb-2">White / S</p>
            </div>
            <div className="md:flex md:flex-row md:space-x-3">
              <p className="mb-2 md:py-1.5">S$39.00</p>
              <select
                id="quantity"
                name="quantity"
                data-te-select-init
                className="border-[1px] border-fontExtraLightGrey/50 bg-transparent w-14 sm:h-fit py-0.5 rounded-sm text-center focus:outline-none"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <p className="md:py-1">S$ 78.00</p>
        </div>
      </div>
      <div className="text-xxxs flex flex-row justify-end space-x-3 my-2">
        <p>Edit</p>
        <p>Remove</p>
      </div>
    </>
  );
};

export default ProductCart;
