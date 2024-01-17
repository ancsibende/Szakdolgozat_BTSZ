import React, { useEffect, useState } from "react";
import { Result } from "../../types";
import Modal from "../Modal/Modal";
import LL from "../../translations";
import styles from "./ResultModal.module.scss";
import {
  addResultsToEvent,
  editResult,
  getImage,
  uploadImage,
} from "../../api/events/events.api";

import { GlassMagnifier, MagnifierContainer } from "react-image-magnifiers";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface ResultModalProps {
  homeTeam: string | undefined;
  guestTeam: string | undefined;
  date: string | undefined;
  turn: number | undefined;
  isOpen: boolean;
  eventId: number | undefined;
  onClose: () => void;
  eventResults?: Result[];
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  eventId,
  homeTeam,
  guestTeam,
  date,
  turn,
  eventResults,
}) => {
  const initialResult = {
    homeName: "",
    guestName: "",
    hsumpin: 0,
    gsumpin: 0,
    hsetpoints: 0,
    gsetpoints: 0,
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ArrayBuffer>();

  const navigate = useNavigate();

  useEffect(() => {
    const loadImage = async () => {
      if (eventId) {
        try {
          const imageData = await getImageForEvent(eventId);
          setImageData(imageData);
        } catch (error) {
          console.error("Hiba a kép betöltése során:", error);
        }
      }
    };

    loadImage();
  }, [eventId]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  const getImageForEvent = async (eventId: number) => {
    try {
      const response = await getImage(eventId);
      return response;
    } catch (error) {
      console.error("Kép lekérése sikertelen:", error);
    }
  };

  const storedRole = localStorage.getItem("role");
  const isAdmin = storedRole === "admin";

  const [results, setResults] = useState<Result[]>(
    eventResults || [
      initialResult,
      initialResult,
      initialResult,
      initialResult,
    ],
  );

  const handleSave = async () => {
    const isDataValid = results.every((result) => {
      return (
        result.homeName.trim() !== "" &&
        result.guestName.trim() !== "" &&
        result.hsumpin !== 0 &&
        result.gsumpin !== 0 &&
        !(result.gsetpoints === 0 && result.hsetpoints === 0)
      );
    });

    if (!isDataValid) {
      setErrorMessage(LL.result.errorMissingMsg);
    } else {
      try {
        const event = eventId;
        if (event) {
          if (!isAdmin && file) {
            // Ha a felhasználó nem admin és van kiválasztva fájl, akkor feltöltjük a képet
            const uploadResponse = await uploadImage(event, file);
            if (uploadResponse.status !== 200) {
              setErrorMessage("Hiba a fájlfeltöltés során.");
              return;
            }
          }

          if (eventResults) {
            // Ha vannak eredmények, akkor azokat módosítjuk
            await editResult(event, results);
          } else {
            // Ha nincsenek eredmények, akkor újakat adunk hozzá
            await addResultsToEvent(event, results);
          }

          // Alaphelyzetbe állítjuk az eredményeket és bezárjuk a modált
          setResults([
            initialResult,
            initialResult,
            initialResult,
            initialResult,
          ]);
          onClose();
        }
      } catch (error) {
        if (
          isAxiosError(error) &&
          error.response &&
          error.response.status === 403
        ) {
          setError(true);
        } else {
          console.error("Hiba a mentés során:", error);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg"
      ) {
        if (selectedFile.size <= 100 * 1024) {
          // 100KB = 100 * 1024 bájt
          setFile(selectedFile);
          setErrorMessage("");
        } else {
          setFile(null);
          setErrorMessage(
            "A kiválasztott fájl mérete túl nagy. Válassz kisebb méretű fájlt (max. 100KB)!",
          );
        }
      } else {
        setFile(null);
        setErrorMessage(
          "A kiválasztott fájl típusa nem megfelelő. Válassz JPEG fájlt!",
        );
      }
    }
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedResults = [...results];
    updatedResults[index] = {
      ...updatedResults[index],
      [field]: value,
    };

    if (field === "hsetpoints") {
      updatedResults[index].gsetpoints =
        4 - (typeof value === "number" ? value : parseFloat(value));
    } else if (field === "gsetpoints") {
      updatedResults[index].hsetpoints =
        4 - (typeof value === "number" ? value : parseFloat(value));
    }

    setResults(updatedResults);
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const label = `${formattedDate}, ${turn}. ${LL.raceCalendar.turn}`;

  return (
    <Modal open={isOpen} onClose={onClose} type="wide">
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: "12px",
          justifyContent: imageData ? "flex-start" : "center",
        }}
      >
        <div style={{ width: "85%" }}>
          <form>
            <div className={styles.title}>{homeTeam + " - " + guestTeam}</div>
            <div className={styles.subtitle}>{label}</div>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            {!isAdmin && (
              <div>
                <div className={styles.protocol}>{LL.uploadProtocol}</div>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
              </div>
            )}
            <div>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "25%" }}>{LL.result.home}</th>
                    <th style={{ width: "20%" }}>{LL.result.sumpin}</th>
                    <th>{LL.result.setpoint}</th>
                    <th colSpan={2} style={{ width: "10%" }}></th>
                    <th style={{ width: "25%" }}>{LL.result.guest}</th>
                    <th style={{ width: "20%" }}>{LL.result.sumpin}</th>
                    <th>{LL.result.setpoint}</th>
                  </tr>
                </thead>
                <tbody>
                  {results &&
                    (results.some((result) => result !== initialResult)
                      ? results
                          /* .filter((row) => row.id !== undefined)
                        .sort((a, b) => a.id! - b.id!) */
                          .map((result, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  value={result.homeName}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "homeName",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={result.hsumpin}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "hsumpin",
                                      parseInt(e.target.value),
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={result.hsetpoints}
                                  min={0}
                                  max={4}
                                  step="0.5"
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "hsetpoints",
                                      parseFloat(e.target.value),
                                    )
                                  }
                                />
                              </td>
                              <td colSpan={2}></td>
                              <td>
                                <input
                                  type="text"
                                  value={result.guestName}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "guestName",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={result.gsumpin}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "gsumpin",
                                      parseInt(e.target.value),
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={result.gsetpoints}
                                  min={0}
                                  max={4}
                                  step="0.5"
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "gsetpoints",
                                      parseFloat(e.target.value),
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))
                      : results.map((result, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                value={result.homeName}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "homeName",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={result.hsumpin}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "hsumpin",
                                    parseInt(e.target.value),
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={result.hsetpoints}
                                min={0}
                                max={4}
                                step="0.5"
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "hsetpoints",
                                    parseFloat(e.target.value),
                                  )
                                }
                              />
                            </td>
                            <td colSpan={2}></td>
                            <td>
                              <input
                                type="text"
                                value={result.guestName}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "guestName",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={result.gsumpin}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "gsumpin",
                                    parseInt(e.target.value),
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={result.gsetpoints}
                                min={0}
                                max={4}
                                step="0.5"
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "gsetpoints",
                                    parseFloat(e.target.value),
                                  )
                                }
                              />
                            </td>
                          </tr>
                        )))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
        {imageData && (
          <div
            style={{
              width: "35%",
              paddingLeft: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <MagnifierContainer>
              <GlassMagnifier
                imageSrc={`data:image/jpeg;base64,${btoa(
                  String.fromCharCode(...new Uint8Array(imageData)),
                )}`}
                imageAlt="Image"
                largeImageSrc={`data:image/jpeg;base64,${btoa(
                  String.fromCharCode(...new Uint8Array(imageData)),
                )}`}
                allowOverflow={true}
              />
            </MagnifierContainer>
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSave}>
          {eventResults ? LL.result.edit : LL.result.save}
        </button>
      </div>
    </Modal>
  );
};

export default ResultModal;
