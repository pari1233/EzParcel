import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import bannerImage from '../../../Assests/bg4.jpg';

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#020202] font-[600] capitalize`}
        >
          Ship with space<br />travel with freedom<br />earn on the move <br />
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#3d3a3a] ">
        Connect with travelers who have extra luggage space to send your goods quickly and affordably. Our platform makes shipping easier by matching customers with travelers already on the move. Safe, simple, and cost-effective.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-15`}>
                 <span className="text-[#dcdf35] font-[Poppins] text-[14px]">
                    Find Orders
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
