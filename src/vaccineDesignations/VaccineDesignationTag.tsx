import { Tag, Tooltip } from "antd";
import { VaccineDesignation } from "./vaccineDesignations";

export default function VaccineDesignationTag(props: {
  designation: VaccineDesignation;
}) {
  const { designation } = props;

  return (
    <Tooltip
      title={designation.text}
      color={designation.labelColor}
      placement="bottom"
    >
      <Tag
        style={{ fontSize: "1em" }}
        color={designation.labelColor}
        icon={<designation.icon />}
      >
        {designation.label}
      </Tag>
    </Tooltip>
  );
}
