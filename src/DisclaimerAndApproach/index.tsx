import { Row, Col, Typography } from "antd";

/**
 * Provides information about Approach and Disclaimer
 */
export default function Disclaimer() {
  return (
    <Row>
      <Col xs={24}>
        <Typography.Title>Disclaimer and Approach</Typography.Title>
        <Typography.Paragraph>
          Thank you for trying out this service.
        </Typography.Paragraph>
      </Col>
    </Row>
  );
}
