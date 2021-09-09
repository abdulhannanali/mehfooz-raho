import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import { Alert, Col, Row, Typography } from "antd";
import { stringify } from "querystring";
import { GOOGLE_CLIENT_SIDE_API_KEY } from "./constants";

const baseURL = "https://www.google.com/maps/embed/v1";
const mapMode = "search";
const defaultRegion = "pk";

interface HealthCentreMapProps {
  vaccinationCentre: VaccinationCentre;
}

function HealthCentreMap(props: HealthCentreMapProps) {
  const queryString = stringify({
    key: GOOGLE_CLIENT_SIDE_API_KEY,
    region: defaultRegion,
    q: props.vaccinationCentre.googlePlacesResponse[0]?.name,
  });

  const src = `${baseURL}/${mapMode}?${queryString}`;

  return (
    <Row>
      <Col xs={24}>
        <iframe
          src={src}
          frameBorder="0"
          style={{ border: "0", width: "100%", height: "300px" }}
          allowFullScreen
        ></iframe>
      </Col>
      <Col xs={24}>
        <Alert
          message="Confirm location once again through your local sources!"
          type="warning"
        />
      </Col>
    </Row>
  );
}

export default HealthCentreMap;
