import { MedicineBoxFilled } from "@ant-design/icons";
import { Card, Skeleton } from "antd";
import { Link } from "react-router-dom";
import healthCareWorkerImage from "./avatars/healthcareworker.png";
import { VaccinationCentre } from "../../api/vaccinationsFakeAPI";
import getVaccinationCentreLink from "./getVaccinationCentreLink";
import { VaccinationCentreProps } from "./types";
import { getVaccinationCentre } from "./skeletonData";

const loadingCardProps = {
  title: "Sample Center Name",
  description: "Address of the centre",
};

export default function VaccinationCentreCard(props: {
  vaccinationCentre: VaccinationCentre;
  isLoading: boolean;
}) {
  const { isLoading, vaccinationCentre } = props;

  return (
    <Card>
      <Skeleton loading={isLoading} avatar>
        <Link to={getVaccinationCentreLink(vaccinationCentre)}>
          <Card.Meta
            title={vaccinationCentre.name}
            description={vaccinationCentre?.address}
            avatar={<img width="45px" src={healthCareWorkerImage}></img>}
          ></Card.Meta>
        </Link>
      </Skeleton>
    </Card>
  );
}
