import Helmet from "react-helmet";
import { Row, Col, Button, Card, Statistic, Typography } from "antd";
import TextTransition from "./TextTransition";

import "./Home.css";
import { SearchHospitalIcon, VaccineIcon } from "../customSvgIcons";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

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
        </div>
      </div>

      <div className="content">
        <Row>
          <Col xs={24}>
            <Card
              title={<Typography.Title level={3}>Find a Centre <VaccineIcon /></Typography.Title>}    
            >
                <Typography.Paragraph>
                Search for a vaccination centre near you by your district, tehsil or name
                </Typography.Paragraph>
                <Link to="/centres">
                  <Button type="primary" icon={<SearchHospitalIcon />}>Search for a centre</Button>
                </Link>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title={<Typography.Title level={3}>Explore all cities <VaccineIcon /></Typography.Title>}  
            >
              <Typography.Paragraph>
                Centre is probably available near you, even if you live in a remote mountainous area of Pakistan.
                Check out all these cities
              </Typography.Paragraph>
              <Link to="/cities">
                <Button type="primary" icon={<SearchHospitalIcon />}>Explore All Cities</Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24}>

          </Col>
        </Row>
      </div>
    </div>
  );
}
