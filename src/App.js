import React, { useState } from "react";
import MainPage from "./pages/Main";
import CheckListPage from "./pages/CheckList";
import SurveyPage from "./pages/Survey/SurveyPage";
import MapPage from "./pages/Map/MapPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import BottomNav from "./pages/BottomNav";
import Mypage from "./pages/Mypage";
import LandingPage from "./pages/LandingPage";
import MyProfilePage from "./pages/MyProfile";
import SplashPage from "./pages/StartPage";
import NewTrip from "./pages/NewTrip";
import MakeTripPage from "./pages/MakeTripPage";
import FixMyProfilePage from "./pages/FixMyProfile";
import UserProfilePage from "./pages/UserProfile";
import NavermyMap from "./pages/NaverMap";
import ViewTripPage from "./pages/ViewTrip";
import SearchPage from "./pages/SearchPage";

function Content() {
  return (
    <>
      <Routes>
        <Route path="/navermap" element={<NavermyMap />} />

        <Route path="/" element={<SignInPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/search"
          element={
            <>
              <SearchPage />
              <BottomNav />
            </>
          }
        />

        <Route
          path="/map"
          element={
            <>
              <MapPage />
              <BottomNav />
            </>
          }
        />
        <Route
          path="/viewtrip"
          element={
            <>
              <ViewTripPage />
              <BottomNav />
            </>
          }
        />

        <Route
          path="/landing"
          element={
            <>
              <LandingPage />
              <BottomNav />
            </>
          }
        />
        <Route
          path="/mypage"
          element={
            <>
              <Mypage />
              <BottomNav />
            </>
          }
        />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/fixprofile" element={<FixMyProfilePage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route
          path="/newtrip"
          element={
            <>
              <NewTrip />
              <BottomNav />
            </>
          }
        />
        <Route
          path="/maketrip"
          element={
            <>
              <MakeTripPage />
              <BottomNav />
            </>
          }
        />
        <Route
          path="/newtrip"
          element={
            <>
              <NewTrip />
              <BottomNav />
            </>
          }
        />
      </Routes>
    </>
  );
}
function App() {
  return (
    <>
      <RecoilRoot>
        {/* <GlobalStyle /> */}
        <Router>
          <Content />
        </Router>
      </RecoilRoot>
    </>
  );
}
export default App;
