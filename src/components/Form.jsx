import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CityContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoPositionError, setGeoPositionError] = useState("");
  const [emoji, setEmoji] = useState();

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function getCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoPositionError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "This does't seem to be a city. Click somewhere else 😊"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          console.log(data);
        } catch (err) {
          setGeoPositionError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const cityData = {
      cityName,
      country,
      date: date.toLocaleDateString("en-GB"),
      notes,
      position: { lat, lng },
      emoji,
    };
    await createCity(cityData);
    navigate("/app");
  }

  if (geoPositionError) return <Message message={geoPositionError} />;
  if (isLoadingGeoCoding) return <Spinner />;
  if (!lat && !lng)
    return (
      <Message
        message={"Click somewhere on the map to select a localtion first."}
      />
    );

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleFormSubmit}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
