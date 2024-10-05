import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country } from "country-state-city";
import { createTourPlan } from "../../redux/actions/tourPlan";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TourPlanForm = ({ travelerId }) => {
  const { user } = useSelector((state) => state.user);
  const { success, error } = useSelector((state) => state.tourPlan);
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);      
    }
    if (success) {
      toast.success("Tour Plan created successfully!");
      setFromCountry("");
      setToCountry("");
      setDate("")
    }
  }, [dispatch, error, navigate, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createTourPlan({
        traveler: user._id,
        fromCountry,
        toCountry,
        date,
      })
    );
    
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Tour Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-[100%]">
              <label className="block pb-2">From Country</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                required
              >
                <option value="">From country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[100%]">
              <label className="block pb-2">To Country</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
                required
              >
                <option value="">To country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          >
            Create Tour Plan
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default TourPlanForm;
