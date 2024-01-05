import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useRouter } from 'next/router'
import { IArticleCreate } from '@/src/services/articles/articles.interface'
import { useMutation, useQuery } from 'react-query'
import { getAdminUrl } from '@/src/config/url.config'
import { ArticlesService } from '@/src/services/articles/articles.service'
import { toastError } from '@/src/utils/toast-error'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const useArticleEdit = (setValue: UseFormSetValue<IArticleCreate>) => {
    const {push, query} = useRouter()

    const articleId = Number(query.id)

    const { isLoading, data } = useQuery(['get article', articleId], () =>
        ArticlesService.get(articleId), {
        onSuccess: ({ data }) => {
            setValue('title', data.title)
        },
        onError: (error) => {
            push(getAdminUrl())

            toastError(error)
        },
        enabled: !!articleId
    })

    const { mutateAsync } = useMutation('update article', (data: IArticleCreate) => ArticlesService.update(data, articleId), {
        onError: (error: AxiosError) => {
            if (error.response?.status == 304) {
                toast.error('You haven\'t made any changes.')

                return
            }

            toastError(error)
        },
        onSuccess: () => {
            toast.success(`Article successfully updated ✅`)

            push(getAdminUrl())
        },
    })

    const onSubmit: SubmitHandler<IArticleCreate> = async (data) => {
        await mutateAsync(data)
    }

    return { onSubmit, isLoading, articleData: data }
}