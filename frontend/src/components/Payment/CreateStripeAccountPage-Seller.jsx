import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";

const CreateStripeAccountPageSeller = () => {
  const { seller } = useSelector((state) => state.seller);
  const [loading, setLoading] = useState(false);

  const handleCreateStripeAccount = async () => {
    setLoading(true);
    console.log(seller._id);
    try {
      const response = await axios.post(`${server}/payment/create-stripe-account-seller`, {
        userId: seller._id,
      });

      const { accountLink } = response.data;

      // Redirect user to Stripe's onboarding flow
      window.location.href = accountLink.return_url;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to create Stripe account for seller.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.section} w-[90%] 800px:w-[50%] mx-auto py-10`}>
      <h2 className="text-[24px] font-[600] text-center mb-8">Create Your Stripe Account For Seller</h2>
      <div className="flex justify-center">
        <button
          className={`${styles.button} !rounded !h-11 flex items-center`}
          onClick={handleCreateStripeAccount}
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Stripe Account For Seller"}
        </button>
      </div>
    </div>
  );
};

export default CreateStripeAccountPageSeller;
