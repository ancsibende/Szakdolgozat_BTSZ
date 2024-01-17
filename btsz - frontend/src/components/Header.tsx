import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logos/logoBTSZ.png";
import HamburgerIcon from "../assets/icons/iconHamburger.svg";
import NewsIcon from "../assets/icons/iconDashboard4.svg";
import TeamsIcon from "../assets/icons/iconTeams.svg";
import RacesIcon from "../assets/icons/iconRaces.svg";
import AboutUsIcon from "../assets/icons/iconAbout.svg";
import LoginIcon from "../assets/icons/iconLogin.svg";
import ProfileIcon from "../assets/icons/iconProfile.svg";
import LL from "../translations";
import { logout } from "../api/login/login.api";
import Modal from "./Modal/Modal";

interface HeaderProps {
  title: string;
}

const MAIN_PATH = "/";
const ASSOCIATIONS_PATH = "/egyesuletek";
const RACES_PATH = "/versenysport";
const NEWS_PATH = "/hirek";
const ABOUTUS_PATH = "/kapcsolat";
const LOGIN_PATH = "/bejelentkezes";
const PROFILE_PATH = "/profil";

const Header = ({ title }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.status === 200) {
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.href = "/";
      } else {
        setErrorMessage("Sikertelen kijelentkezés!");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Hiba történt a kijelentkezés során: ", error);
      setErrorMessage(LL.errorMsg3);
      setShowAlert(true);
    }
  };

  const isNavLinkActive = (path: string) => {
    return window.location.pathname.startsWith(path);
  };

  const renderNavLinks = () => {
    return (
      <>
        {showAlert && (
          <Modal open={showAlert} onClose={() => setShowAlert(false)}>
            {errorMessage}
          </Modal>
        )}
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={NEWS_PATH}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={NewsIcon} />
          {LL.news}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={ASSOCIATIONS_PATH}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={TeamsIcon} style={{ paddingBottom: "10px" }} />
          {LL.teams}
        </NavLink>
        <div className={styles.dropdownContainer}>
          <NavLink
            className={isNavLinkActive(RACES_PATH) ? styles.active : ""}
            to={"#"}
          >
            <img src={RacesIcon} />
            {LL.raceSport}
          </NavLink>
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownGroup}>
              <a>{LL.races}</a>
              <div className={styles.secondLevelDropdown}>
                <NavLink
                  to={RACES_PATH + "/szabalyzatok"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {LL.regulations}
                </NavLink>
                <NavLink
                  to={RACES_PATH + "/naptar"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Naptár
                </NavLink>
              </div>
            </div>
            <div className={styles.dropdownGroup}>
              <NavLink
                to={RACES_PATH + "/budapest-bajnoksag"}
                onClick={() => setIsMenuOpen(false)}
              >
                {LL.championship}
              </NavLink>
            </div>
          </div>
        </div>
        <div className={styles.dropdownContainer}>
          <NavLink
            className={isNavLinkActive(ABOUTUS_PATH) ? styles.active : ""}
            to={"#"}
          >
            <img src={AboutUsIcon} />
            {LL.aboutUs1}
          </NavLink>
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownGroup}>
              <NavLink
                to={ABOUTUS_PATH + "/elerhetosegeink"}
                onClick={() => setIsMenuOpen(false)}
              >
                {LL.aboutUs2}
              </NavLink>
              <NavLink
                to={ABOUTUS_PATH + "/teke-tortenete"}
                onClick={() => setIsMenuOpen(false)}
              >
                {LL.history}
              </NavLink>
            </div>
          </div>
        </div>
        {isLoggedIn ? (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to={PROFILE_PATH}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={ProfileIcon} />
              {LL.profile}
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to={MAIN_PATH}
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              <img src={LoginIcon} />
              {LL.logout}
            </NavLink>
          </>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={LOGIN_PATH}
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={LoginIcon} />
            {LL.login}
          </NavLink>
        )}
      </>
    );
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src={Logo} className={styles.headerLogo} />
      </div>
      <div className={styles.pageTitle}>
        <Link to={MAIN_PATH} className={styles.link}>
          {title}
        </Link>
      </div>
      <div className={styles.navigationContainer}>{renderNavLinks()}</div>

      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={styles.hamburgerIcon}
      >
        <img src={HamburgerIcon} />
      </div>
      {isMenuOpen && (
        <div className={styles.mobileMenu}>{renderNavLinks()}</div>
      )}
    </div>
  );
};

export default Header;
