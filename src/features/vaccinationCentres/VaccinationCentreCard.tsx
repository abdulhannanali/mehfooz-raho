import { MedicineBoxFilled } from "@ant-design/icons";
import { Card, Skeleton } from "antd";
import healthCareWorkerImage from "./avatars/healthcareworker.png";
import {
  VaccinationCentre,
} from "../../api/vaccinationsFakeAPI";

const loadingCardProps = {
  title: "Sample Center Name",
  description: "Address of the centre",
};

const loadingCardMeta = (
  <Card.Meta
    avatar
    title={loadingCardProps.title}
    description={loadingCardProps.description}
  />
);

export default function VaccinationCentreCard(props: {
  vaccinationCentre?: VaccinationCentre;
  isLoading: boolean;
}) {
  const { isLoading, vaccinationCentre } = props;
  let cardMeta;

  if (isLoading || !vaccinationCentre) {
    cardMeta = loadingCardMeta;
  } else {
    cardMeta = <RealCardMeta {...vaccinationCentre} />;
  }

  return (
    <Card>
      <Skeleton loading={isLoading} avatar>
        {cardMeta}
      </Skeleton>
    </Card>
  );
}

function RealCardMeta(vaccinationCentre: VaccinationCentre) {
  return (
    <Card.Meta
      title={vaccinationCentre.name}
      description={vaccinationCentre.address}
      avatar={<img width="45px" src={healthCareWorkerImage}></img>}
    ></Card.Meta>
  );
}

// TODO
// Create a designation card that beautifully lists the details of the vaccination centre
