import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import LL from "../../translations";
import AddIcon from "../../assets/icons/iconAdd.svg";
import DeleteIcon from "../../assets/icons/iconDeleteProfile.svg";
import EditIcon from "../../assets/icons/iconEdit.svg";
import AlphabeticalSortIcon from "../../assets/icons/iconArrow.svg";

import {
  getUsers,
  addUser,
  deleteUser,
  modifyUser,
} from "../../api/userManagement/user-management.api";
import { User, Event } from "../../types";
import Modal from "../../components/Modal/Modal";
import { Card, CardActions, CardHeader, RadioGroup } from "@mui/material";
import { postHomeEvents } from "../../api/events/events.api";
import ResultModal from "../../components/ResultModal/ResultModal";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const Profile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [shouldRefreshUsers, setShouldRefreshUsers] = useState<boolean>(true);
  const [userToDelete, setUserToDelete] = useState<string>("");
  const [comingEvents, setComingEvents] = useState<Event[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const storedRole = localStorage.getItem("role");
  const team = localStorage.getItem("team");
  const isAdmin = storedRole === "admin";
  const isTeamLeader = storedRole === "teamLeader";
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: "",
    team: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const fetchData = async () => {
    try {
      const response = await getUsers();
      const sortedUsers = response.data.sort((a, b) =>
        a.username.localeCompare(b.username),
      );
      setUsers(sortedUsers);
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 403
      ) {
        setError(true);
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const getComingEvents = async () => {
    try {
      if (team) {
        const response = await postHomeEvents(team);
        setComingEvents(response.data);
      } else {
        console.log("Nincs team név!");
      }
    } catch (error) {
      console.error("Hiba az események lekérése során:", error);
    }
  };

  useEffect(() => {
    if (shouldRefreshUsers && isAdmin) {
      fetchData();
      setShouldRefreshUsers(false);
    }
  }, [shouldRefreshUsers && isAdmin]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  useEffect(() => {
    !isAdmin && !isTeamLeader ? setError(true) : "";
  }, []);

  useEffect(() => {
    if (isTeamLeader) {
      getComingEvents();
    }
  }, [isTeamLeader]);

  const toggleResultModal = (event: Event | null) => {
    setSelectedEvent(event);
    setResultModal(event !== null);
    if (event === null) {
      getComingEvents();
    }
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
    const sortedUsers = [...users].sort((a, b) => {
      if (sortAsc) {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });
    setUsers(sortedUsers);
  };

  const handleDelete = async (usernameToDelete: string) => {
    try {
      await deleteUser(usernameToDelete);
      setShouldRefreshUsers(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePasswordAgainChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setPasswordAgain(value);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      if (editUser) {
        if (newUser.password !== passwordAgain) {
          setPasswordMismatch(true);
          return;
        }
        setPasswordMismatch(false);
        try {
          const response = await modifyUser(editUser.username, newUser);
          setShouldRefreshUsers(true);
          setShowModal(false);
        } catch (error) {
          console.error("Hiba a felhasználó módosítása során:", error);
        }
      }
    } else {
      if (newUser.password !== passwordAgain) {
        setPasswordMismatch(true);
        return;
      }
      setPasswordMismatch(false);
      try {
        const response = await addUser(newUser);
        setShowModal(false);
        setShouldRefreshUsers(true);
      } catch (error) {
        console.error("Hiba a felhasználó hozzáadása során:", error);
      }
    }
  };

  useEffect(() => {
    if (editUser) {
      setNewUser(editUser);
      setPasswordAgain("");
    }
  }, [editUser]);

  const toggleModal = () => {
    setNewUser({
      username: "",
      email: "",
      password: "",
      role: "",
      team: "",
      gender: "",
    });
    setPasswordAgain("");
    setShowModal(!showModal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        {isAdmin
          ? LL.profile
          : team != null
          ? LL.hi.replace("{team}", team)
          : ""}
      </div>
      {isAdmin ? (
        <>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => {
                toggleModal();
                setIsEditing(false);
              }}
            >
              <img src={AddIcon} />
              {LL.addUser}
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <td>
                    <span>{LL.teamManagement.username}</span>
                    <button className={styles.sortButton} onClick={handleSort}>
                      <img
                        src={AlphabeticalSortIcon}
                        className={
                          sortAsc ? styles.sortIcon : styles.sortIconDesc
                        }
                      />
                    </button>
                  </td>
                  <td>{LL.teamManagement.email}</td>
                  <td>{LL.teamManagement.role}</td>
                  <td>{LL.teamManagement.team}</td>
                  <td>{LL.teamManagement.gender}</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role == "teamLeader"
                        ? LL.teamManagement.teamLeader
                        : LL.teamManagement.admin}
                    </td>
                    <td>{user.team || "-"}</td>
                    {user.gender
                      ? user.gender === "Female"
                        ? LL.teamManagement.female
                        : LL.teamManagement.male
                      : "-"}
                    <td>
                      <div className={styles.modifyContainer}>
                        <img
                          style={{ cursor: "pointer" }}
                          src={EditIcon}
                          onClick={() => handleEditClick(user)}
                        />
                        <img
                          style={{ cursor: "pointer" }}
                          src={DeleteIcon}
                          onClick={() => {
                            setUserToDelete(user.username);
                            setShowAlert(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>
          <h4>{LL.comingEvents}</h4>
          {comingEvents && comingEvents.length > 0 ? (
            comingEvents.map((event) => (
              <Card className={styles.card} key={event.id}>
                <div
                  style={{
                    display: "inline-flex",
                    width: "100%",
                  }}
                >
                  <CardHeader
                    style={{ width: "80%" }}
                    title={event.team1 + " - " + event.team2}
                  ></CardHeader>
                  <CardActions disableSpacing>
                    <button
                      className={styles.button}
                      onClick={() => toggleResultModal(event)}
                    >
                      <img src={AddIcon} />
                      {LL.result.addResult}
                    </button>
                  </CardActions>
                </div>
              </Card>
            ))
          ) : (
            <p className={styles.noComingEvents}>{LL.noComingEvents}</p>
          )}
        </div>
      )}

      {resultModal && (
        <ResultModal
          homeTeam={selectedEvent?.team1}
          guestTeam={selectedEvent?.team2}
          date={selectedEvent?.date.replace(/-/g, ".")}
          turn={selectedEvent?.turn}
          onClose={() => toggleResultModal(null)}
          isOpen={resultModal}
          eventId={selectedEvent?.id}
        ></ResultModal>
      )}

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <form>
            <label htmlFor="username">{LL.teamManagement.username + ":"}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={newUser.username || ""}
              onChange={handleChange}
            />
            <label htmlFor="email">{LL.teamManagement.email + ":"}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email || ""}
              onChange={handleChange}
            />
            <label htmlFor="password">{LL.teamManagement.password + ":"}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password || ""}
              onChange={handleChange}
            />
            <label htmlFor="passwordAgain">
              {LL.teamManagement.passwordAgain + ":"}
            </label>
            <input
              type="password"
              id="passwordAgain"
              name="passwordAgain"
              value={passwordAgain || ""}
              onChange={handlePasswordAgainChange}
            />
            <label htmlFor="team">{LL.teamManagement.team + ":"}</label>
            <input
              type="text"
              id="team"
              name="team"
              value={newUser.team || ""}
              onChange={handleChange}
            />
            {!isEditing && (
              <>
                <label htmlFor="gender">{LL.teamManagement.gender + ":"}</label>
                <RadioGroup
                  id="genderGroup"
                  name="genderGroup"
                  value={newUser.gender}
                >
                  <div className={styles.radioContainer}>
                    <div>
                      <input
                        type="radio"
                        id="maleRadio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        checked={newUser.gender === "Male"}
                      />
                      <label htmlFor="maleRadio">
                        {" "}
                        {LL.teamManagement.male}
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="femaleRadio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        checked={newUser.gender === "Female"}
                      />
                      <label htmlFor="femaleRadio">
                        {" "}
                        {LL.teamManagement.female}
                      </label>
                    </div>
                  </div>
                </RadioGroup>
                <label htmlFor="role">{LL.teamManagement.role + ":"}</label>
                <RadioGroup
                  id="roleGroup"
                  name="roleGroup"
                  value={newUser.role}
                >
                  <div className={styles.radioContainer}>
                    <div>
                      <input
                        type="radio"
                        id="adminRadio"
                        name="role"
                        value="admin"
                        onChange={handleChange}
                        checked={newUser.role === "admin"}
                      />
                      <label htmlFor="adminRadio">
                        {" "}
                        {LL.teamManagement.admin}
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="teamLeaderRadio"
                        name="role"
                        value="teamLeader"
                        onChange={handleChange}
                        checked={newUser.role === "teamLeader"}
                      />
                      <label htmlFor="teamLeaderRadio">
                        {" "}
                        {LL.teamManagement.teamLeader}
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </>
            )}
          </form>
          {passwordMismatch && (
            <div style={{ color: "red" }}>
              {LL.teamManagement.passwordMismatchErrorMessage}
            </div>
          )}
          <div className={styles.submitContainer}>
            <button
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            >
              {isEditing ? LL.teamManagement.modify : LL.teamManagement.submit}
            </button>
          </div>
        </Modal>
      )}
      <Modal
        open={showAlert}
        submitText={LL.delete}
        cancelText={LL.cancel}
        onClose={() => setShowAlert(false)}
        onCancel={() => setShowAlert(false)}
        onSubmit={() => {
          handleDelete(userToDelete);
          setShowAlert(false);
        }}
      >
        <p>{LL.deleteUser.replace("{userName}", userToDelete)}</p>
      </Modal>
    </div>
  );
};

export default Profile;
