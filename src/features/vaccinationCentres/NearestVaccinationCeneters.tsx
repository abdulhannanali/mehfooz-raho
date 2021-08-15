import { List } from "antd";
import { GeolibInputCoordinates } from "geolib/es/types";
import { title } from "process";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import getVaccinationCentreLink from "./getVaccinationCentreLink";
import { VaccinationCentreProps } from "./types";
import { selectors } from "./vaccinationCentresSlice";
import VaccineDesignationTag from "./VaccineDesignationTag";

/**
 * Provides with Nearest Vaccination Centers available
 *
 *
 */
export default function NearestVaccinationCenters(
  props: VaccinationCentreProps
) {
  const { vaccinationCentre } = props;
  const dispatch = useAppDispatch();

  const allCentres = useAppSelector((state) => {
    return selectors.selectVaccinationCentresByLocation(
      state,
      vaccinationCentre
    );
  });

  // First one is the centre itself
  const centres = allCentres.slice(1, 11);

  return (
    <List
      itemLayout="horizontal"
      dataSource={centres}
      renderItem={(item) => {
        const { target, distance } = item;

        const centreTag = (
          <VaccineDesignationTag designation={target.designation} />
        );
        const link = getVaccinationCentreLink(target);
        const description = `This vaccination centre is ${
          distance / 1000
        } km away from here`;

        return (
          <List.Item>
            <List.Item.Meta
              key={target.id}
              title={
                <Link to={link}>
                  {target.name}
                  {centreTag}
                </Link>
              }
              description={description}
            >
              {centreTag}
            </List.Item.Meta>
          </List.Item>
        );
      }}
    ></List>
  );
}
