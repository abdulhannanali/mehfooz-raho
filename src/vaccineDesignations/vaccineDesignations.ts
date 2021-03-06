import { TeamworkIcon } from "../customSvgIcons";

export interface VaccineDesignation {
  text: string;
  label: string;
  labelColor: string;
  icon: typeof TeamworkIcon;
}

const all: VaccineDesignation = {
  text: "Open To All",
  label: "Everyone",
  labelColor: "#52c41a",
  icon: TeamworkIcon,
};

const citizens: VaccineDesignation = {
  text: "Open To All",
  label: "Everyone",
  labelColor: "#52c41a",
  icon: TeamworkIcon,
};

const healthCareWorkers: VaccineDesignation = {
  text: "Open to Health Care Workers Only",
  label: "Health Care Workers",
  labelColor: "#6BCBB8",
  icon: TeamworkIcon,
};

export const vaccineDesignations = {
  citizens,
  healthCareWorkers,
  all,
};
