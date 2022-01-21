import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import { fetchAsyncGetUser } from "features/auth/authSlice";
import DrawerHeader from "features/common/DrawerHeader";

const Default: React.FC = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetUser());
    };
    fetchBootLoader();
  }, [dispatch]);
  return (
    <div>
      <DrawerHeader>{children}</DrawerHeader>
    </div>
  );
};

export default Default;
