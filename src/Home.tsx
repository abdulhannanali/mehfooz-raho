import Helmet from "react-helmet";
import { Row, Col, Button, Card, Statistic, Typography } from "antd";
import TextTransition from "./TextTransition";

import "./Home.css";

const vaccinatedPakistanSpans = [
  "Vaccinated Pakistan",
  "پاکستان واکسین کړی",
  "ويڪسين ٿيل پاڪستان",
  "ویکسین شدہ پاکستان۔",
  "پاکستان واکسینه شده است",
].map((text) => (
  <span className="transitioningText">
    <Typography.Title>{text}</Typography.Title>
  </span>
));

export default function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Vaccination Centres Near You!</title>
      </Helmet>
      <div className="hero">
        <div className="hero-image">
          <Row>
            <Col span={24} style={{ margin: "0 auto" }}>
              <div className="textTransition">
                <TextTransition
                  textArray={vaccinatedPakistanSpans}
                  delay={1500}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button type="primary" shape="round">
                Nearest center by City
              </Button>
              <Button type="primary" shape="round">
                Nearest center Province
              </Button>
              <Button type="primary" shape="round">
                Let me find nearest center by your location!
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      <div className="content">
        <Row></Row>
      </div>
    </div>
  );
}
