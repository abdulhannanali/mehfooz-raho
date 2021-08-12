import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'


export default function FetchError(props: { onRefresh?: () => void}) {
    const { onRefresh = () => {} } = props
    
    return (
        <Result
            status="500"
            title="Failed to fetch!"
            subTitle="Sorry! We were unable to get the list for you"
            extra={
                <React.Fragment>
                    <Link to="/"><Button type="primary">Go to Main Page</Button></Link>
                    <Button type="link" onClick={onRefresh}>Refresh</Button>
                </React.Fragment>
            }
        />
    )
}

