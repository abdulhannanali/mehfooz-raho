import { Pagination } from 'antd'
import { PaginationResponse } from '../../lib/functionsClient'
import { useMediaQuery } from 'react-responsive'

export default function PaginationComponent (props: { 
    response: PaginationResponse<string>
    onChange: (page: number) => void
}) {
    const { response } = props
    const isSmallScreen = useMediaQuery({ query: '(max-width: 425px)'})    


    return (
        <Pagination 
            defaultCurrent={response.currentPage}
            total={(response.totalElements)}
            showSizeChanger={false}
            simple={isSmallScreen}
            onChange={props.onChange}
        />
    )
}

