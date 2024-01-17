import React, { useEffect, useState } from "react";
import styles from "./RaceCalendar.module.scss";
import Calendar from "react-calendar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

import { format, isSameDay } from "date-fns";
import { hu } from "date-fns/locale";
import LL from "../../translations";
import { IconButton, IconButtonProps, RadioGroup, styled } from "@mui/material";
import iconExpand from "../../assets/icons/iconArrow.svg";
import AddIcon from "../../assets/icons/iconAdd.svg";
import DeleteIcon from "../../assets/icons/iconDelete.svg";
import EditIcon from "../../assets/icons/iconEdit2.svg";

import { Event } from "../../types";
import {
  addEvent,
  deleteEvent,
  getEvents,
  getImage,
} from "../../api/events/events.api";
import Modal from "../../components/Modal/Modal";
import TimePicker from "react-time-picker";
import { getTeams } from "../../api/userManagement/user-management.api";
import ResultModal from "../../components/ResultModal/ResultModal";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RaceCalendar = () => {
  const [expandedMap, setExpandedMap] = useState<{
    [key: number]: boolean;
  }>({});
  const storedRole = localStorage.getItem("role");
  const isAdmin = storedRole === "admin";
  const [events, setEvents] = useState<Event[]>([]);
  const [womanTeams, setWomanTeams] = useState<string[]>([]);
  const [maleTeams, setMaleTeams] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [deleteEventId, setDeleteEventId] = useState<number | undefined>(
    undefined,
  );
  const [editResult, setEditResult] = useState<boolean>(false);
  const [modifyEvent, setModifyEvent] = useState<Event | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<Event>({
    date: "",
    time: "",
    gender: "Male",
    place: "",
    team1: "",
    team2: "",
    turn: 1,
    season: "2023/2024",
  });

  const selectedTeams = newEvent.gender === "Female" ? womanTeams : maleTeams;
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const teamsData = await getTeams();

      const womanTeams = teamsData.Female;
      const maleTeams = teamsData.Male;

      setWomanTeams(womanTeams);
      setMaleTeams(maleTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchTeams();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  const handleExpandClick = (eventIndex: number) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [eventIndex]: !prevExpandedMap[eventIndex],
    }));
  };

  const [selectedDate, setSelectedDate] = useState<{
    date: Date;
    events: Event[];
  } | null>({
    date: new Date(),
    events: [],
  });

  const toggleResultModal = async (event: Event | null) => {
    setModifyEvent(event);
    setEditResult(true);
  };

  const tileClassName = ({ date }: any) => {
    const maleEvent = events.find(
      (event) =>
        event.date === minifyDateForCalendar(date) && event.gender === "Male",
    );
    const femaleEvent = events.find(
      (event) =>
        event.date === minifyDateForCalendar(date) && event.gender === "Female",
    );

    let classNames = [styles.day];

    if (maleEvent && femaleEvent) {
      classNames.push(styles.half);
    } else if (maleEvent) {
      classNames.push(styles.blue);
    } else if (femaleEvent) {
      classNames.push(styles.pink);
    }

    if (selectedDate && isSameDay(date, selectedDate.date)) {
      classNames.push(styles.selectedDate);
    }

    return classNames.join(" ");
  };
  const formatWeekday = (locale: string | undefined, date: Date) => {
    return format(date, "EE", { locale: hu });
  };

  const CustomNavigationLabel = ({ date }: any) => {
    const month = format(date, "MMMM", { locale: hu });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return (
      <span className={styles.label}>
        {capitalizedMonth} {format(date, "yyyy", { locale: hu })}
      </span>
    );
  };

  const handleDayClick = (date: Date) => {
    setExpandedMap({});
    const selectedEvents = events.filter((event) =>
      isSameDay(date, new Date(event.date)),
    );

    if (selectedEvents.length > 0) {
      setSelectedDate({
        date: date,
        events: selectedEvents,
      });
    } else {
      setSelectedDate({
        date: date,
        events: [],
      });
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const dateOfSelectedDate = selectedDate.date;
      const updatedSelectedEvents = events.filter((event) =>
        isSameDay(new Date(event.date), dateOfSelectedDate),
      );
      setSelectedDate({
        date: dateOfSelectedDate,
        events: updatedSelectedEvents,
      });
    }
  }, [events]);

  const calculateTeamPoints = (
    hsetpoints: number,
    gsetpoints: number,
    hsumpin: number,
    gsumpin: number,
  ) => {
    if (
      hsetpoints > gsetpoints ||
      (hsetpoints === gsetpoints && hsumpin > gsumpin)
    ) {
      return 1;
    } else if (hsetpoints === gsetpoints && hsumpin === gsumpin) {
      return 0.5;
    } else {
      return 0;
    }
  };

  const calculatePointsForEvent = (event: Event) => {
    if (event.results) {
      const homeSumPin = event.results.reduce(
        (sum, row) => sum + row.hsumpin,
        0,
      );

      const guestSumPin = event.results.reduce(
        (sum, row) => sum + row.gsumpin,
        0,
      );

      const totalPoints = event.results.reduce(
        (total, row) => {
          const homePoints = calculateTeamPoints(
            row.hsetpoints,
            row.gsetpoints,
            row.hsumpin,
            row.gsumpin,
          );
          const guestPoints = calculateTeamPoints(
            row.gsetpoints,
            row.hsetpoints,
            row.gsumpin,
            row.hsumpin,
          );

          return {
            home: total.home + homePoints,
            guest: total.guest + guestPoints,
          };
        },
        { home: 0, guest: 0 },
      );

      if (homeSumPin > guestSumPin) {
        totalPoints.home += 2;
      } else if (guestSumPin > homeSumPin) {
        totalPoints.guest += 2;
      } else {
        totalPoints.home += 1;
        totalPoints.guest += 1;
      }
      return totalPoints;
    } else {
      return { home: 0, guest: 0 };
    }
  };

  const toggleModal = () => {
    setNewEvent({
      date: "",
      time: "",
      gender: "Male",
      place: "",
      team1: "",
      team2: "",
      turn: 1,
      season: "2023/2024",
    });
    setShowModal(true);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      setNewEvent((prevEvent) => ({
        ...prevEvent,
        date: formattedDate,
      }));
    }
  };

  const handleTimeChange = (newDateTime: any) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      time: newDateTime,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleDeleteEvent = async (eventId: number | undefined) => {
    if (eventId !== undefined) {
      try {
        await deleteEvent(eventId);
        await fetchEvents();
      } catch (error) {
        if (
          isAxiosError(error) &&
          error.response &&
          error.response.status === 403
        ) {
          setError(true);
        } else {
          console.error("Hiba az esemény törlése során", error);
        }
      }
    } else {
      console.error("Érvénytelen eventId: ", eventId);
    }
  };

  const handleSubmit = async () => {
    try {
      if (newEvent.team1 === newEvent.team2) {
        alert("A két csapat nem lehet ugyanaz!");
      } else if (
        Object.values(newEvent).every((value) => value !== "" && value !== 0)
      ) {
        await addEvent(newEvent);
        setShowModal(false);
        await fetchEvents();
      } else {
        alert("Minden mező kitöltése kötelező!");
      }
    } catch (error) {
      console.error("Hiba az esemény hozzáadása során:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.raceCalendar.raceCalendar}</div>
      {isAdmin ? (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={toggleModal}>
            <img src={AddIcon} />
            {LL.raceCalendar.addRace}
          </button>
        </div>
      ) : (
        <></>
      )}
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <form>
            <label htmlFor="date">{LL.raceCalendar.date + ":"}</label>
            <div className={styles.dateContainer}>
              <DatePicker
                selected={newEvent.date ? new Date(newEvent.date) : null}
                onSelect={handleDateChange}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                locale={hu}
              ></DatePicker>
            </div>
            <label htmlFor="time">{LL.raceCalendar.time + ":"}</label>
            <div className={styles.timeContainer}>
              <TimePicker
                onChange={handleTimeChange}
                value={newEvent.time}
                locale="hu-HU"
                disableClock={true}
              />
            </div>
            <label htmlFor="place">{LL.raceCalendar.place + ":"}</label>
            <input
              type="text"
              id="place"
              name="place"
              value={newEvent.place}
              onChange={handleChange}
            />
            <label htmlFor="turn">{LL.raceCalendar.turn + ":"}</label>
            <input
              type="number"
              min="1"
              id="turn"
              name="turn"
              value={newEvent.turn}
              onChange={handleChange}
            />
            <label htmlFor="gender">{LL.teamManagement.gender + ":"}</label>
            <RadioGroup
              id="genderGroup"
              name="genderGroup"
              value={newEvent.gender}
            >
              <div className={styles.radioContainer}>
                <div>
                  <input
                    type="radio"
                    id="maleRadio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={newEvent.gender === "Male"}
                  />
                  <label htmlFor="maleRadio"> {LL.teamManagement.male}</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="femaleRadio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={newEvent.gender === "Female"}
                  />
                  <label htmlFor="femaleRadio">
                    {" "}
                    {LL.teamManagement.female}
                  </label>
                </div>
              </div>
            </RadioGroup>
            <label htmlFor="team1">{LL.raceCalendar.homeTeam + ":"}</label>
            <div className={styles.timeContainer}>
              <select
                id="team1"
                name="team1"
                value={newEvent.team1}
                onChange={handleChange}
              >
                <option value="">{LL.raceCalendar.defaultTeam}</option>
                {selectedTeams.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="team2">{LL.raceCalendar.guestTeam + ":"}</label>
            <div className={styles.timeContainer}>
              <select
                id="team2"
                name="team2"
                value={newEvent.team2}
                onChange={handleChange}
              >
                <option value="">{LL.raceCalendar.defaultTeam}</option>
                {selectedTeams.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <div className={styles.submitContainer}>
            <button
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            >
              {LL.teamManagement.submit}
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
          handleDeleteEvent(deleteEventId);
          setShowAlert(false);
          setDeleteEventId(undefined);
        }}
      >
        <p>{LL.raceCalendar.deleteEvent}</p>
      </Modal>

      <div className={styles.calendarContainer}>
        <div className={styles.calendarGroup}>
          <Calendar
            minDetail={"month"}
            className={styles.calendar}
            tileClassName={tileClassName}
            formatShortWeekday={formatWeekday}
            navigationLabel={CustomNavigationLabel}
            onClickDay={handleDayClick}
          />
        </div>
        {selectedDate && (
          <div style={{ paddingLeft: "12px", width: "100%" }}>
            <div>
              {selectedDate.events.length == 0 && (
                <p>{LL.raceCalendar.noRaceToday}</p>
              )}
              {selectedDate.events.length != 0 &&
                selectedDate.events.map((event, index) => (
                  <div key={index} style={{ padding: "12px" }}>
                    <Card className={styles.card}>
                      <div
                        style={{
                          display: "inline-flex",
                          width: "100%",
                        }}
                      >
                        {isAdmin ? (
                          <>
                            <div
                              className={styles.delButton}
                              onClick={() => {
                                setDeleteEventId(event.id);
                                setShowAlert(true);
                              }}
                            >
                              <img src={DeleteIcon} />
                            </div>
                            {event.results?.length != 0 && (
                              <div
                                className={styles.delButton}
                                onClick={() => {
                                  toggleResultModal(event);
                                }}
                              >
                                <img src={EditIcon} />
                              </div>
                            )}
                          </>
                        ) : (
                          <></>
                        )}

                        <CardHeader
                          style={{ width: "80%" }}
                          title={event.team1 + " - " + event.team2}
                          subheader={
                            format(selectedDate.date, "yyyy.MM.dd. EEEE ", {
                              locale: hu,
                            }) +
                            event.time +
                            ", " +
                            event.place +
                            " pálya"
                          }
                        ></CardHeader>
                        {event.results?.length !== 0 && (
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expandedMap[index] || false}
                              onClick={() => handleExpandClick(index)}
                              aria-expanded={expandedMap[index] || false}
                              aria-label="show more"
                            >
                              <img src={iconExpand} />
                            </ExpandMore>
                          </CardActions>
                        )}
                      </div>
                      <Collapse
                        in={expandedMap[index] || false}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          {/* RESULTS TABLE */}
                          <div>
                            <table style={{ width: "100%" }}>
                              <thead>
                                <tr>
                                  <th>{LL.raceCalendar.home}</th>
                                  <th>{LL.raceCalendar.sum}</th>
                                  <th>{LL.raceCalendar.set}</th>
                                  <th colSpan={2}>{LL.raceCalendar.team}</th>
                                  <th>{LL.raceCalendar.set}</th>
                                  <th>{LL.raceCalendar.sum}</th>
                                  <th>{LL.raceCalendar.guest}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {event.results
                                  ?.filter((row) => row.id !== undefined)
                                  .sort((a, b) => a.id! - b.id!)
                                  .map((row) => (
                                    <tr>
                                      <td>{row.homeName}</td>
                                      <td>{row.hsumpin}</td>
                                      <td>{row.hsetpoints}</td>
                                      <td>
                                        {calculateTeamPoints(
                                          row.hsetpoints,
                                          row.gsetpoints,
                                          row.hsumpin,
                                          row.gsumpin,
                                        )}
                                      </td>
                                      <td>
                                        {calculateTeamPoints(
                                          row.gsetpoints,
                                          row.hsetpoints,
                                          row.gsumpin,
                                          row.hsumpin,
                                        )}
                                      </td>
                                      <td>{row.gsetpoints}</td>
                                      <td>{row.gsumpin}</td>
                                      <td>{row.guestName}</td>
                                    </tr>
                                  ))}
                                <tr>
                                  <td></td>
                                  <td className={styles.teamSum}>
                                    {event.results?.reduce(
                                      (sum, row) => sum + row.hsumpin,
                                      0,
                                    )}
                                  </td>
                                  <td className={styles.teamSetSum}>
                                    {event.results?.reduce(
                                      (sum, row) => sum + row.hsetpoints,
                                      0,
                                    )}
                                  </td>
                                  <td className={styles.finalResult}>
                                    {calculatePointsForEvent(event).home}
                                  </td>
                                  <td className={styles.finalResult}>
                                    {calculatePointsForEvent(event).guest}
                                  </td>
                                  <td className={styles.teamSetSum}>
                                    {event.results?.reduce(
                                      (sum, row) => sum + row.gsetpoints,
                                      0,
                                    )}
                                  </td>
                                  <td className={styles.teamSum}>
                                    {event.results?.reduce(
                                      (sum, row) => sum + row.gsumpin,
                                      0,
                                    )}
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        )}
        {editResult && (
          <ResultModal
            homeTeam={modifyEvent?.team1}
            guestTeam={modifyEvent?.team2}
            date={modifyEvent?.date}
            turn={modifyEvent?.turn}
            isOpen={editResult}
            eventId={modifyEvent?.id}
            eventResults={modifyEvent?.results}
            onClose={() => {
              setEditResult(false);
              fetchEvents();
            }}
          ></ResultModal>
        )}
      </div>
    </div>
  );
};

const minifyDateForCalendar = (date: Date | string) => {
  const converted = new Date(date);
  const year = converted.getFullYear();
  const month =
    converted.getMonth() + 1 < 10
      ? `0${converted.getMonth() + 1}`
      : converted.getMonth() + 1;
  const day =
    converted.getDate() < 10 ? `0${converted.getDate()}` : converted.getDate();
  return `${year}-${month}-${day}`;
};

export default RaceCalendar;
