import { Col, Row, Typography } from 'antd'
import { VaccinationCentre } from '../../api/vaccinationsFakeAPI'
import { useParams } from 'react-router-dom'


import GutterRow from '../../GutterRow'
import { useAppSelector } from '../../app/hooks'

export default function VaaccinationCentreOverview (props: VaccinationCentre) {
    const params = useParams<{ centreId: string; }>()
    const selector = useAppSelector()

    if (params.centreId) {
        
    }



    return (
        <Row className="title">
            <Col span={24}>
                <Typography.Title level={1}>
                    {props.name}
                </Typography.Title>
            </Col>
        </Row>


    )
}