import { useEffect, useState } from 'react'
import { useArticles } from '@/src/components/screens/Home/Articles/useArticles'

export const usePagination = () => {
    const [currPage, setCurrPage] = useState<number>(1)

    const { data, refetch } = useArticles({ page: currPage })

    useEffect(() => {
        if (data) setCurrPage(data?.pageInfo.currentPage)
    }, [data])

    const totalPages = data?.pageInfo.totalPages || 1

    return { currPage, setCurrPage, data, refetch, totalPages }
}