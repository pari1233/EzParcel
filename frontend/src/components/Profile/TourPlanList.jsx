import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { getAllTourPlansForUser, getAllTravelPlan } from '../../redux/actions/tourPlan';
import axios from 'axios';
import { server } from '../../server';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const TourPlanList = ({ userType }) => {
  const { tourPlans, loading } = useSelector((state) => state.tourPlan);
  const { isSeller } = useSelector((state) => state.seller);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "seller") {
      dispatch(getAllTravelPlan());
    }else {
      dispatch(getAllTourPlansForUser());
    }
  }, [dispatch, userType]);

  const handleSendMessage = async (plan) => {
      if (isSeller) {
        const groupTitle = plan._id + seller._id;
        const userId = plan.traveler._id;
        const sellerId = seller._id;
        console.log(groupTitle, userId, sellerId);
        await axios
          .post(`${server}/conversation/create-new-conversation`, {
            groupTitle,
            userId,
            sellerId,
          })
          .then((res) => {
            navigate(`/dashboard-messages`);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } else {
        toast.error("Please login to create a conversation");
      }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tour Plans</h2>
      {tourPlans.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No tour plans found</p>
      ) : (
        <ul className="space-y-4">
          {tourPlans.map((plan) => (
            <li
              key={plan._id}
              className="p-4 bg-gray-100 rounded-md shadow-md space-y-2"
            >
              {isSeller && (<>
                <p className="text-lg font-semibold">
                Traveler Name: <span className="font-normal">{plan.traveler.name}</span>
              </p>
              <p className="text-lg font-semibold">
                Email: <span className="font-normal">{plan.traveler.email}</span>
              </p>
              </>) }
              <p className="text-lg font-semibold">
                From Country: <span className="font-normal">{plan.fromCountry}</span>
              </p>
              <p className="text-lg font-semibold">
                To Country: <span className="font-normal">{plan.toCountry}</span>
              </p>
              <p>
                Date:{" "}
                <span className="font-semibold">
                  {new Date(plan.date).toLocaleDateString()}
                </span>{" "}
                
              </p>
             { isSeller && <button
                onClick={() => handleSendMessage(plan)}
                className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
              >
                Send Message
              </button> }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TourPlanList;
