import React, { useState } from "react";
import { Layout, Menu, Row, Col, Typography } from "antd";
import { Route, Link, Switch, useLocation } from "react-router-dom";

import Logo from "./Logo";
import Home from "./Home/";

import "./App.css";
import AllCentresDisplay from "./features/vaccinationCentres/CentresDisplay";
import Cities from "./features/vaccinationCities/Cities";
import VaccinationCentreOverview from "./features/vaccinationCentres/VaccinationCentreOverview";
import { Helmet } from "react-helmet";
import { HeartFilled } from "@ant-design/icons";

const IS_DARK_DEFAULT =
  "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)");

function App() {
  return (
    <Layout className="layout">
      <Helmet>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://i.imgur.com/625Z5h1.jpg" />
      </Helmet>
      <Layout.Header style={{ margin: '10px 0 10px 0'}}>
        <Row justify="center">
          <Col className="gutter-row" xs={24}>
            <Logo></Logo>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content className="layout-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cities" component={Cities}></Route>
          <Route exact path="/centres" component={AllCentresDisplay}></Route>
          <Route
            exact
            path="/centre/:centreId"
            component={VaccinationCentreOverview}
          />
        </Switch>
      </Layout.Content>
      <Layout.Footer style={{ marginTop: '30px'}}>
        <Row justify="center">
          <Col xs={24}>
            <Typography.Title level={5} style={{textAlign: 'center'}}>
              Made with <HeartFilled twoToneColor={["red", "red"]} /> 
            </Typography.Title>  
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
