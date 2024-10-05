import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.seller._id));
  }, [data, dispatch]);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.seller._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const handleClaimOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to claim the order");
      return;
    }

    try {
      const response = await axios.put(`${server}/order/${data._id}/claim`, {
        traveler: user._id,
      });

      if (response.status === 200) {
        toast.success("Order successfully claimed!");
        navigate("/profile");
      }

      // Optionally, redirect or refresh the page to show the updated state.
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to claim the order.");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.product.images[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.product.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Delivery Fee: {data.deliveryFee}$
                  </h4>
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Delivery Date: {data.deliveryDate?.slice(0, 10)}
                  </h4>
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Quantity: {data.quantity}
                  </h4>
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Order Status: {data.orderStatus}
                  </h4>
                </div>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Order Country: {data.orderCountry}
                  </h4>
                </div>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Package Size (in kg): {data.packageSize}kg
                  </h4>
                </div>

                 { isAuthenticated && data.orderStatus !== "accepted" &&
                                  <div
                                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                                  onClick={handleClaimOrder}
                                >
                  <span className="text-white flex items-center">
                    Claim the order
                   
                  </span>  </div> 
                 }
                
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.seller._id}`}>
                    <img
                      src={`${data?.seller?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                      
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.seller._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.seller.name}
                      </h3>
                    </Link>
    
                  </div>

                  { isAuthenticated &&
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div> }
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Order Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Sender Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.product.description}
          </p>
        </>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.seller._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.seller?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.seller.name}</h3>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.seller.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.seller?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Profile</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
