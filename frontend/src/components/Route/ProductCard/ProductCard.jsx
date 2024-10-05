import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${`/product/${data._id}`}`}>
          <img
            src={`${data.product.images && data.product.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.seller._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.seller.name}</h5>
        </Link>
        <Link to={`${`/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500]">
            {data.product.name.length > 40 ? data.product.name.slice(0, 40) + "..." : data.product.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h4 className={`${styles.productDiscountPrice}`}>
                {data.deliveryFee ? data.deliveryFee + " $" : null}
              </h4>
            </div>
          </div>
        </Link>

      </div>
    </>
  );
};

export default ProductCard;
