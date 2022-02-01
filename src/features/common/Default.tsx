import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import { fetchAsyncGetUser } from "features/auth/authSlice";
import { fetchAsyncGetSubject } from "features/common/commonSlice";
import DrawerHeader from "features/common/DrawerHeader";

const Default: React.FC = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetUser());
      await dispatch(fetchAsyncGetSubject());
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
