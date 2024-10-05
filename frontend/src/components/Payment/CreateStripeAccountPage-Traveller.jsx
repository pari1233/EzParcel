import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";

const CreateStripeAccountPageTraveler = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleCreateStripeAccount = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${server}/payment/create-stripe-account-traveler`, {
        userId: user._id,
      });

      const { accountLink } = response.data;

      // Redirect user to Stripe's onboarding flow
      window.location.href = accountLink.url;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to create Stripe account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.section} w-[90%] 800px:w-[50%] mx-auto py-10`}>
      <h2 className="text-[24px] font-[600] text-center mb-8">Create Your Stripe Account for Traveller</h2>
      <div className="flex justify-center">
        <button
          className={`${styles.button} !rounded !h-11 flex items-center`}
          onClick={handleCreateStripeAccount}
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Stripe Account"}
        </button>
      </div>
    </div>
  );
};

export default CreateStripeAccountPageTraveler;
