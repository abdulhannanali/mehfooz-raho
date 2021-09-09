import { Row, RowProps } from "antd";
import { PropsWithChildren } from "react";

// As specified here https://ant.design/components/grid/#components-grid-demo-gutter
const responsiveGutterObject = [{ xs: 8, sm: 16, md: 24, lg: 32 }];

export default function GutterRow(props: RowProps) {
  return (
    <Row gutter={[16, 16]} {...props}>
      {props.children}
    </Row>
  );
}
