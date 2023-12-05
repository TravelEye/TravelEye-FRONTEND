import React, { useState } from "react";
import "./BottomNav.css";
import { Link } from "react-router-dom";

import Landing_active from "../assets/images/Landing_active.png";
import Landing_unactive from "../assets/images/Landing_unactive.png";
import Map_active from "../assets/images/Map_active.png";
import Map_unactive from "../assets/images/Map_unactive.png";
import Mypage_active from "../assets/images/Mypage_active.png";
import Mypage_unactive from "../assets/images/Mypage_unactive.png";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);
  const Mapgo = () => {
    return activeNav === 1 ? Map_active : Map_unactive;
  };
  const LandingGo = () => {
    return activeNav === 2 ? Landing_active : Landing_unactive;
  };
  const MypageGo = () => {
    return activeNav === 3 ? Mypage_active : Mypage_unactive;
  };

  return (
    <nav className="wrapper">
      <div>
        <Link to="/map" className="Map-link" onClick={() => setActiveNav(1)}>
          <div>
            <img
              src={Mapgo()}
              //style={{ width: 53, height: 53 }}
              alt="랜딩 활성화"
            />
          </div>
        </Link>
      </div>
      <div>
        <Link
          to="/landing"
          className="Map-link"
          onClick={() => setActiveNav(2)}
        >
          <div>
            <img
              src={LandingGo()}
              //style={{ width: 25, height: 25 }}
              alt="맵 활성화"
            />
          </div>
        </Link>
      </div>
      <div>
        <Link to="/mypage" className="Map-link" onClick={() => setActiveNav(3)}>
          <div>
            <img
              src={MypageGo()}
              //style={{ width: 25, height: 25 }}
              alt="마이페이지 활성화"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
