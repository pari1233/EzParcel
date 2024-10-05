import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiOutlineSearch,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { Country } from "country-state-city";
import CountryDropDown from "./Country_DropDown";
import Logo from '../../Assests/Logo.jpeg'

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const countries = useMemo(() => {
    const countries = Country.getAllCountries().map((country) => {
      return {
        name: country.name, 
        code: country.isoCode}
      });
    return countries;
  }, []);


  return (
    <>
      {/* Desktop Header */}
      <div className={`${styles.section} hidden lg:flex items-center justify-between h-[70px] my-[20px]`}>
        <div>
          <Link to="/">
            <img
              src={Logo}
              alt="EZ Parcel"
              className="h-[100px] w-auto object-contain"
            />
          </Link>
        </div>
        {/* Search Box */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search Orders..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-4 border-[#3957db] border-[2px] rounded-md focus:outline-none"
          />
          <AiOutlineSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer text-gray-500"
          />
{searchData && searchData.length !== 0 && searchTerm && (
  <div className="absolute w-full bg-white shadow-md z-10 mt-1 rounded-md max-h-[300px] overflow-y-auto">
    {searchData.map((i) => (
      <Link to={`/product/${i._id}`} key={i._id} className="flex items-center p-2 hover:bg-gray-100">
        <img
          src={i.product.images[0]?.url}
          alt={i.product.name}
          className="w-[40px] h-[40px] mr-2"
        />
        <h1 className="text-sm">{i.product.name}</h1>
      </Link>
    ))}
  </div>
)}

        </div>

        {/* Become Seller or Dashboard */}
        {!isAuthenticated && (
          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Dashboard" : "Become User"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        )}
      </div>

      {/* Sticky Header */}
      <div
        className={`${
          active ? "fixed top-0 left-0 z-10 shadow-sm" : ""
        } transition hidden lg:flex items-center justify-between w-full bg-[#101013] h-[70px]`}
      >
        <div className={`${styles.section} relative flex items-center justify-between`}>
        
        <div className="flex items-center space-x-4">
          {/* Categories Dropdown */}
          <div onClick={() => setDropDown(!dropDown)} className="relative">
            <div className="h-[60px] mt-[10px] w-[200px] xl:block cursor-pointer">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          {/* Country Dropdown */}
          <div onClick={() => setCountryDropDown(!countryDropDown)} className="relative">
            <div className="h-[60px] mt-[10px] w-[200px] xl:block cursor-pointer">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                Countries
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
              />
              {countryDropDown && (
                <CountryDropDown
                  categoriesData={countries}
                  setDropDown={setCountryDropDown}
                />
              )}
            </div>
          </div>
        </div>

          {/* Navbar */}
          <Navbar active={activeHeading} />

          <div className="flex items-center">
            {!isSeller && (
              <div className="relative cursor-pointer mr-4">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user?.avatar?.url}
                      className="w-[35px] h-[35px] rounded-full"
                      alt={user?.username}
                    />
                  </Link>
                ) : (
                 
                  <Link to="/login">
                   <div className="text-white flex items-center justify-center">
  <h1 className="flex items-center">
    Become Traveller <IoIosArrowForward className="ml-1" />
  </h1>
  <CgProfile size={30} color="rgb(255 255 255 / 83%)" className="ml-2" />
</div>

                  </Link>
                 
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active ? "fixed top-0 left-0 z-10 shadow-sm" : ""
        } w-full h-[60px] bg-[#fff] z-50 flex items-center justify-between lg:hidden`}
      >
        <div className="flex items-center justify-between w-full px-4">
          <BiMenuAltLeft
            size={40}
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <Link to="/">
            <img
              src={Logo}
              alt="EZ Parcel"
              className="h-[40px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* Mobile Sidebar */}
        {open && (
          <div className="fixed w-full h-full bg-[#0000005f] z-20 top-0 left-0">
            <div className="fixed w-[70%] bg-[#fff] h-full top-0 left-0 z-30 overflow-y-auto">
              <div className="flex justify-between items-center p-4">

                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 px-4">
                <input
                  type="search"
                  placeholder="Search Orders..."
                  className="h-[40px] w-full px-4 border-[#3957db] border-[2px] rounded-md focus:outline-none"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full mt-2 rounded-md">
                    {searchData.map((i) => (
                      <Link to={`/product/${i._id}`} key={i._id} className="flex items-center p-2 hover:bg-gray-100">
                        <img
                          src={i.images[0]?.url}
                          alt={i.name}
                          className="w-[40px] h-[40px] mr-2"
                        />
                        <h5>{i.name}</h5>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
         <div className={`${styles.button} bg-[#101013] m-4 rounded-md`}>
                <Link to="/shop-create">
                  <h1 className="text-white flex items-center justify-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              { !isAuthenticated &&
                <div className="flex justify-center items-center py-4">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={user?.avatar?.url}
                        alt={user?.username}
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  ) : (
                    <div className="flex space-x-2">
                      <Link to="/login" className="text-lg text-[#000000b7]">
                        Login
                      </Link>
                      <span className="text-lg text-[#000000b7]">/</span>
                      <Link to="/sign-up" className="text-lg text-[#000000b7]">
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        )}
      </div>
    </>
  );

};

export default Header;
