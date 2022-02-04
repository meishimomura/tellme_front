import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import Default from "features/common/Default";
import StudentHome from "./StudentHome";

const Home: React.FC = () => {
  return (
    <div>
      <Default>
        <StudentHome />
      </Default>
    </div>
  );
};

export default Home;
