import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./map.module.css";

function Map() {
  const [searchPrams, setSearchPrams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchPrams.get("lat");
  const lng = searchPrams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>Position</h2>
      <h3>lat: {lat}</h3>
      <h3>lng: {lng}</h3>
    </div>
  );
}

export default Map;
