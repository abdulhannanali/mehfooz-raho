interface PaginationResponse<T> {
    currentPage: number;
    totalPages: number;
    start: number;
    end: number;
    totalElements: number;
    elements: T[]
}


export default function pagination<T>(pageNumber: string | undefined, valuesArray: T[]): PaginationResponse<T> {
    const parsedPageNumber = Math.max(1, Number.parseInt(pageNumber, 10))
    
    let sliced : T[] = []
    let startIdx : number = -1
    let endIdx : number = -1

    if (!Number.isNaN(sliced)) {
        let realPageNumber = parsedPageNumber - 1
        startIdx = realPageNumber * 10
        endIdx = (realPageNumber * 10) + 10
        sliced = valuesArray.slice(startIdx, endIdx)
    }

    const totalPages = Math.ceil(Math.max(valuesArray.length / 10))
    

    return {
        elements: sliced,
        currentPage: parsedPageNumber,
        totalPages,
        start: startIdx,
        end: endIdx,
        totalElements: valuesArray.length
    }
}