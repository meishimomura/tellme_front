import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import Default from "features/common/Default";
import StudentHome from "./StudentHome";
import TeacherHome from "./TeacherHome";

import { selectLoginUser } from "features/auth/authSlice";

const Home: React.FC = () => {
  const loginUser = useSelector(selectLoginUser);
  return (
    <div>
      <Default>
        {loginUser.data.userIsStudent ? <StudentHome /> : <TeacherHome />}
      </Default>
    </div>
  );
};

export default Home;
