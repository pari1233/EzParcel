import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  tourPlans: [],
  error: null,
  success: false,
};

export const tourPlanReducer = createReducer(initialState, {
  tourPlanCreateRequest: (state) => {
    state.isLoading = true;
  },
  tourPlanCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
  },
  tourPlanCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all tour plan for users
  getAllTourPlansForUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllTourPlansForUserSuccess: (state, action) => {
    state.isLoading = false;
    state.tourPlans = action.payload;
  },
  getAllTourPlansForUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

    // get all tour plan for seller
    getAllTravelPlanRequest: (state) => {
      state.isLoading = true;
    },
    getAllTravelPlanSuccess: (state, action) => {
      state.isLoading = false;
      state.tourPlans = action.payload;
    },
    getAllTravelPlanFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
