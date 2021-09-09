import Icon from "@ant-design/icons";

import { ReactComponent as TeamworkIconSvg } from "./TeamworkIcon.svg";
import { ReactComponent as VaccineSvg } from "./vaccine.svg";
import { ReactComponent as SearchHospitalSvg } from "./search-hospital.svg";

export const TeamworkIcon = () => (
  <Icon component={TeamworkIconSvg} />
);

export const VaccineIcon = () => <Icon component={VaccineSvg} />;

export const SearchHospitalIcon = () => <Icon component={SearchHospitalSvg} />;
