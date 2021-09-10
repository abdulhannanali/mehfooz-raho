import { VaccinationCentre } from "@abdulhannanali/vaccination-centres-parser";
import { Alert, Col, Row, Image, Typography } from "antd";
import { stringify } from "querystring";
import { GOOGLE_CLIENT_SIDE_API_KEY } from "./constants";

const baseURL = "https://www.google.com/maps/embed/v1";
const mapMode = "place";
const defaultRegion = "pk";

interface HealthCentreMapProps {
  vaccinationCentre: VaccinationCentre;
}

function HealthCentreMap(props: HealthCentreMapProps) {
  const placeId = props.vaccinationCentre.googlePlacesResponse[0]?.place_id

  console.log(props.vaccinationCentre.googlePlacesResponse)
  
  if (!placeId) {
    return <NotFoundMap />
  }

  const queryString = stringify({
    key: GOOGLE_CLIENT_SIDE_API_KEY,
    q: `place_id:${encodeURIComponent(placeId)}`,
    region: defaultRegion
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
          message="Confirm location once again through your local sources as this map is not verified as of now."
          type="warning"
        />
      </Col>
    </Row>
  );
}


function NotFoundMap () {
  return (
    <Row>
      <Col xs={24} style={{position:'relative', textAlign: 'center'}}>
        <Typography.Title level={5}>Map Not Found For This Centre</Typography.Title>
      </Col>
    </Row>
  )
}

export default HealthCentreMap;
