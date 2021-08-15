import React, { useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import { Route, Link, Switch, useLocation } from "react-router-dom";

import Logo from "./Logo";
import Home from "./Home";

import "./App.css";
import AllCentresDisplay from "./features/vaccinationCentres/CentresDisplay";
import Cities from "./features/vaccinationCities/Cities";
import VaccinationCentreOverview from "./features/vaccinationCentres/VaccinationCentreOverview";
import { Helmet } from "react-helmet";

const IS_DARK_DEFAULT =
  "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)");

function App() {
  return (
    <Layout className="layout">
      <Helmet>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://i.imgur.com/625Z5h1.jpg" />
      </Helmet>
      <Layout.Header>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={24} sm={12} md={12}>
            <Logo></Logo>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={12}></Col>
        </Row>
      </Layout.Header>
      <Layout.Content className="layout-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cities/:province" component={Cities} />
          <Route path="/cities/:province/:district" component={Cities} />
          <Route exact path="/cities" component={Cities}></Route>
          <Route exact path="/centres" component={AllCentresDisplay}></Route>
          <Route
            exact
            path="/centre/:centreId"
            component={VaccinationCentreOverview}
          />
        </Switch>
      </Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
}

export default App;
