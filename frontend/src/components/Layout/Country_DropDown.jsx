import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const CountryDropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?country=${i.code}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {/* Adding a scrollable container */}
      <div className="max-h-[300px] overflow-y-auto pb-4">
        {categoriesData &&
          categoriesData.map((i, index) => (
            <div
              key={index}
              className={`${styles.noramlFlex}`}
              onClick={() => submitHandle(i)}
            >
              <h3 className="m-3 cursor-pointer select-none">{i.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CountryDropDown;
