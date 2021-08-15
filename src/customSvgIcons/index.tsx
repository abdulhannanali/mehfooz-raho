import Icon from "@ant-design/icons";

import { ReactComponent as DoctorIconSvg } from "./DoctorIcon.svg";
import { ReactComponent as TeamworkIconSvg } from "./TeamworkIcon.svg";

export const DoctorIcon = (props: any) => (
  <Icon component={DoctorIconSvg} {...props} />
);

export const TeamworkIcon = (props: any) => (
  <Icon component={TeamworkIconSvg} {...props} />
);
