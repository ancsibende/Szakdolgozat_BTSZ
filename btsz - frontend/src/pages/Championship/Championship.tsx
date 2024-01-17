import React, { useEffect, useState } from "react";
import styles from "./Championship.module.scss";
import LL from "../../translations";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  getEventsWithResultsFemale,
  getEventsWithResultsMale,
} from "../../api/events/events.api";
import { AggregateResults, Event } from "../../types";
import { getTeams } from "../../api/userManagement/user-management.api";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import iconExpand from "../../assets/icons/iconArrow.svg";
import { format } from "date-fns";
import { hu } from "date-fns/locale";

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

const Championship = () => {
  const [data, setData] = useState<AggregateResults[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [selectedGender, setSelectedGender] = useState<string>("female");
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedMap, setExpandedMap] = useState<{
    [key: number]: boolean;
  }>({});

  const sortByPoints = (a: AggregateResults, b: AggregateResults) => {
    // Először rendezzük csökkenő sorrendbe a points mező alapján
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    // Ha a points megegyezik, akkor a győztes csapatpontok alapján rendezzük
    if (b.winTeamPoints !== a.winTeamPoints) {
      return b.winTeamPoints - a.winTeamPoints;
    }

    // Ha a győztes csapatpontok is megegyezik, akkor a győztes szettpontok alapján rendezzük
    return b.winSetPoints - a.winSetPoints;
  };

  const handleDropdownSelect = (option: any, type: string) => {
    if (type === "gender") {
      setSelectedGender(option.value);
      setSelectedNumber(1);
    } else if (type === "number") {
      setSelectedNumber(option.value);
    }
  };

  const getEvents = async () => {
    try {
      const response =
        selectedGender == "female"
          ? await getEventsWithResultsFemale()
          : await getEventsWithResultsMale();
      setEvents(response.data);
    } catch (error) {
      console.error("Hiba az események lekérése során:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const teamsData = await getTeams();
      let chosenTeams;

      if (selectedGender == "female") {
        chosenTeams = teamsData.Female;
      } else {
        chosenTeams = teamsData.Male;
      }
      const initialData: AggregateResults[] = chosenTeams.map((team) => ({
        team,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        winSetPoints: 0,
        lostSetPoints: 0,
        winTeamPoints: 0,
        lostTeamPoints: 0,
        points: 0,
      }));

      setData(initialData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const maxTurn = events.reduce(
    (max: number, event: { turn: number }) => Math.max(max, event.turn),
    0,
  );

  const handleExpandClick = (eventIndex: number) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [eventIndex]: !prevExpandedMap[eventIndex],
    }));
  };

  useEffect(() => {
    fetchTeams();
    getEvents();
  }, [selectedGender]);

  useEffect(() => {
    calculateAggregateResults();
  }, [events]);

  useEffect(() => {
    setExpandedMap({});
  }, [selectedNumber]);

  const genderOptions = [
    { value: "female", label: "Női" },
    { value: "male", label: "Tartalék" },
  ];

  const numberOptions = Array.from({ length: maxTurn }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  }));

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

  const calculateAggregateResults = () => {
    setData((prevData) => {
      return prevData.map((teamData) => {
        let updatedWinSetPoints = teamData.winSetPoints;
        let updatedLostSetPoints = teamData.lostSetPoints;
        let playedMatches = teamData.matches;
        let updatedWinTeamPoints = teamData.winTeamPoints;
        let updatedLostTeamPoints = teamData.lostTeamPoints;
        let updatedWins = teamData.wins;
        let updatedDraws = teamData.draws;
        let updatedLosses = teamData.losses;
        let updatedPoints = teamData.points;

        events.forEach((event) => {
          if (teamData.team === event.team1) {
            const sumhsetpoints = event.results?.reduce(
              (sum, row) => sum + row.hsetpoints,
              0,
            );
            const lostSetPoints = 16 - (sumhsetpoints || 0);
            const pointsForEvent = calculatePointsForEvent(event);

            playedMatches += 1;
            updatedWinSetPoints += sumhsetpoints || 0;
            updatedLostSetPoints += lostSetPoints;
            updatedWinTeamPoints += pointsForEvent.home;
            updatedLostTeamPoints += pointsForEvent.guest;

            if (pointsForEvent.home > pointsForEvent.guest) {
              updatedWins += 1;
              updatedPoints += 2;
            } else if (pointsForEvent.home === pointsForEvent.guest) {
              updatedDraws += 1;
              updatedPoints += 1;
            } else {
              updatedLosses += 1;
            }
          } else if (teamData.team === event.team2) {
            const sumgsetpoints = event.results?.reduce(
              (sum, row) => sum + row.gsetpoints,
              0,
            );
            const lostSetPoints = 16 - (sumgsetpoints || 0);
            const pointsForEvent = calculatePointsForEvent(event);

            playedMatches += 1;
            updatedWinSetPoints += sumgsetpoints || 0;
            updatedLostSetPoints += lostSetPoints;
            updatedWinTeamPoints += pointsForEvent.guest;
            updatedLostTeamPoints += pointsForEvent.home;

            if (pointsForEvent.guest > pointsForEvent.home) {
              updatedWins += 1;
              updatedPoints += 2;
            } else if (pointsForEvent.home === pointsForEvent.guest) {
              updatedDraws += 1;
              updatedPoints += 1;
            } else {
              updatedLosses += 1;
            }
          }
        });

        return {
          ...teamData,
          matches: playedMatches,
          winSetPoints: updatedWinSetPoints,
          lostSetPoints: updatedLostSetPoints,
          winTeamPoints: updatedWinTeamPoints,
          lostTeamPoints: updatedLostTeamPoints,
          wins: updatedWins,
          draws: updatedDraws,
          losses: updatedLosses,
          points: updatedPoints,
        };
      });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.championship}</div>
      <div className={styles.dropdownContainer}>
        <label className={styles.dropdownLabel}>
          {LL.championships.chooseType}
        </label>
        <Dropdown
          className={styles.dropdown}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.dropdownMenu}
          options={genderOptions}
          onChange={(option) => handleDropdownSelect(option, "gender")}
          value={selectedGender}
        />
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th style={{ width: "15%" }} colSpan={2}>
                {LL.championships.team}
              </th>
              <th>{LL.championships.matches}</th>
              <th>{LL.championships.wins}</th>
              <th>{LL.championships.draws}</th>
              <th>{LL.championships.losses}</th>
              <th>{LL.championships.winsp}</th>
              <th>{LL.championships.losesp}</th>
              <th>{LL.championships.wintp}</th>
              <th>{LL.championships.losetp}</th>
              <th>{LL.championships.point}</th>
            </tr>
          </thead>
          <tbody>
            {data.sort(sortByPoints).map((row, index) => (
              <tr key={index}>
                <td>{`${index + 1}.`}</td>
                <td className={styles.teams}>{row.team}</td>
                <td>{row.matches}</td>
                <td>{row.wins}</td>
                <td>{row.draws}</td>
                <td>{row.losses}</td>
                <td>{row.winSetPoints}</td>
                <td>{row.lostSetPoints}</td>
                <td>{row.winTeamPoints}</td>
                <td>{row.lostTeamPoints}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.dropdownContainer}>
        <label className={styles.dropdownLabel}>
          {LL.championships.chooseTurn}
        </label>
        <Dropdown
          className={styles.dropdown}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.dropdownMenu}
          options={numberOptions}
          onChange={(option) => handleDropdownSelect(option, "number")}
          value={selectedNumber.toString()}
          placeholder="Select a number"
        />
      </div>
      {events
        .filter((event) => event.turn == selectedNumber)
        .map((event, index) => (
          <div key={index} style={{ padding: "12px" }}>
            <Card className={styles.card}>
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                }}
              >
                <CardHeader
                  style={{ width: "80%" }}
                  title={event.team1 + " - " + event.team2}
                  subheader={
                    format(new Date(event.date), "yyyy.MM.dd. EEEE ", {
                      locale: hu,
                    }) +
                    event.time +
                    ", " +
                    event.place +
                    " pálya"
                  }
                />
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
  );
};

export default Championship;
