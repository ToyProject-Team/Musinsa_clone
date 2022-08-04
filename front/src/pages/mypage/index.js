import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import MyHeader from 'components/mypage/header';
import MyMain from 'components/mypage/table';


const useMypage = () => {
  
  return (
    <div>
      <div>
          <MyHeader />
          <MyMain />
          
      </div>
    </div>
  );
};

export default useMypage;
