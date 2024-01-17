import React from "react";
import styles from "./App.module.scss";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import RaceCalendar from "./pages/RaceCalendar/RaceCalendar";
import Login from "./pages/Login/Login";
import Regulations from "./pages/Regulations/Regulations";
import ContactDetails from "./pages/ContactDetails/ContactDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Championship from "./pages/Championship/Championship";
import NewsDetails from "./components/NewsDetails/NewsDetails";
import News from "./pages/News/News";
import Error from "./pages/Error/Error";
import Teams from "./pages/Teams/Teams";
import History from "./pages/History/History";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout title={"Budapesti Tekézők Szövetsége"}>
          <div className={styles.App}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/versenysport/naptar" element={<RaceCalendar />} />
              <Route
                path="/kapcsolat/elerhetosegeink"
                element={<ContactDetails />}
              />
              <Route path="/bejelentkezes" element={<Login />} />
              <Route
                path="/versenysport/budapest-bajnoksag"
                element={<Championship />}
              />
              <Route
                path="/versenysport/szabalyzatok"
                element={<Regulations />}
              />
              <Route path="/kapcsolat/teke-tortenete" element={<History />} />
              <Route path="/egyesuletek" element={<Teams />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/hirek" element={<News />} />
              <Route path="/hirek/:id" element={<NewsDetails />} />
              <Route path="/error" element={<Error />} />
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
