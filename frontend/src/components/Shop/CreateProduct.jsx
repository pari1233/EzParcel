import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { Country } from "country-state-city";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products); // Adjust according to your state slice
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryFee, setDeliveryFee] = useState();
  const [packageSize, setPackageSize] = useState();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Order created successfully!");
      navigate("/dashboard"); // Adjust navigation as needed
      window.location.reload();
    }
  }, [dispatch, error, navigate, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("product.name", productName);
    newForm.append("product.description", productDescription);
    newForm.append("product.category", productCategory);
    newForm.append("quantity", quantity);
    newForm.append("deliveryFee", deliveryFee);
    newForm.append("packageSize", packageSize);
    newForm.append("deliveryDate", deliveryDate);
    newForm.append("seller", seller._id);
    newForm.append("country", country);

    dispatch(
      createProduct({
        product: {
          name: productName,
          description: productDescription,
          category: productCategory,
          images,
        },
        quantity,
        deliveryFee,
        deliveryDate,
        seller: seller._id,
        country,
        packageSize
      })
    );
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Order</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={productName}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter the product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="productDescription"
            value={productDescription}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter the product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter the quantity..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Package Size (in kg)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="packageSize"
            value={packageSize}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => {
              console.log(e.target.value)
              setPackageSize(e.target.value)}}
            placeholder="Enter the package size..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Delivery Fee <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="deliveryFee"
            value={deliveryFee}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDeliveryFee(e.target.value)}
            placeholder="Enter the delivery fee..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Delivery Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={deliveryDate}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
        <br />
        <div className="w-[100%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create Order"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 bg-gray-600 text-white rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
