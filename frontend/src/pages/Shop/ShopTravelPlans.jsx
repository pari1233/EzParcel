import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import TourPlanList from '../../components/Profile/TourPlanList';

const ShopTravelPlans = () => {
  return (
        <div>
            <DashboardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={12} />
                </div>
                <div className="w-full justify-center flex">
                   <TourPlanList userType={"seller"}/>
                </div>
              </div>
        </div>
  )
}

export default ShopTravelPlans