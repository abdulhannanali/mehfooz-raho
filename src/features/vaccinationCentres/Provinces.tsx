import { Col, Row, Card } from "antd";

export default function Provinces() {
  const provinces = ["AJK", "GB", "Punjab", "Sindh", "KPK", "Balochistan"];

  const columns = provinces.map((province) => {
    return (
      <div className="province">
        <Col xs={24} md={12} lg={6} key={province}>
          <Card title={province} hoverable></Card>
        </Col>
      </div>
    );
  });
}
