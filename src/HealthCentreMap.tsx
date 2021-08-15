import { VaccinationCentre } from "./api/vaccinationsFakeAPI";
import { stringify } from "querystring";
import { GOOGLE_CLIENT_SIDE_API_KEY } from "./constants";

const baseURL = "https://www.google.com/maps/embed/v1";
const mapMode = "search";
const defaultRegion = "pk";

interface HealthCentreMapProps {
  vaccinationCentre: VaccinationCentre;
}

function HealthCentreMap(props: HealthCentreMapProps) {
  const { vaccinationCentre } = props;

  const queryString = stringify({
    key: GOOGLE_CLIENT_SIDE_API_KEY,
    region: defaultRegion,
    q: props.vaccinationCentre.province,
  });

  const src = `${baseURL}/${mapMode}?${queryString}`;

  return (
    <iframe
      src={src}
      frameBorder="0"
      style={{ border: "0", width: "100%", height: "300px" }}
      allowFullScreen
    ></iframe>
  );
}

export default HealthCentreMap;
