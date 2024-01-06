import { Dispatch, FC, SetStateAction } from 'react'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'
import { AxiosResponse } from 'axios'
import { IArticleResponse } from '@/src/services/article/article.interface'
import s from './Pagination.module.scss'

interface IPagination {
    refetch: <TPageData>(options?: ((RefetchOptions & RefetchQueryFilters<TPageData>) | undefined)) => Promise<QueryObserverResult<AxiosResponse<IArticleResponse, any>, unknown>>
    data: IArticleResponse | undefined
    currPage: number
    setCurrPage: Dispatch<SetStateAction<number>>
    totalPages: number
}

const Pagination: FC<IPagination> = ({ refetch, data, currPage, setCurrPage, totalPages }) => {
    if (!data?.articles.length) return null

    const handlePreviousClick = () => {
        const newPage = Math.max(currPage - 1, 1)

        refetch({ queryKey: ['get all article', newPage] })

        setCurrPage(newPage)
    }

    const handleNextClick = () => {
        const newPage = Math.min(currPage + 1, totalPages)

        refetch({ queryKey: ['get all article', newPage] })

        setCurrPage(newPage)
    }

    return (
        <div className={s.root}>
            <button
                onClick={handlePreviousClick}
                disabled={currPage === 1}
            >
                Previous
            </button>
            <span>{currPage} of {totalPages}</span>
            <button
                onClick={handleNextClick}
                disabled={currPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination