import { FC } from 'react'
import s from '../Article.module.scss'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from 'react-query'
import { AxiosError } from 'axios/index'
import { toast } from 'react-toastify'
import { toastError } from '@/src/utils/toast-error'
import { CommentService } from '@/src/services/comment/comment.service'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IComment } from '@/src/services/comment/comment.interface'
import Button from '@/src/components/ui/form-elements/Button'
import TextareaField from '@/src/components/ui/form-elements/TextareaField'
import Moment from 'react-moment'
import { IArticle } from '@/src/services/article/article.interface'

interface IArticleComments {
    id: number
    comments: IComment[]
    refetch: <TPageData>(options?: ((RefetchOptions & RefetchQueryFilters<TPageData>) | undefined)) => Promise<QueryObserverResult<IArticle, unknown>>
}

interface ICommentField {
    text: string
}

const ArticleComments: FC<IArticleComments> = ({ id, comments, refetch }) => {
    const { mutateAsync } = useMutation(
        'create comment',
        (text: string) => CommentService.create(text, id),
        {
            onError: (error: AxiosError) => {
                toastError(error)
            },
            onSuccess: () => {
                toast.success(`Comment successfully created ✅`)

                refetch()
                reset()
            },
        },
    )

    const { handleSubmit, formState: { errors }, register, reset } = useForm<ICommentField>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<ICommentField> = async ({ text }) => {
        if (text.trim().length === 0) return toast.error('The "Text" field must not be empty')

        await mutateAsync(text.trim())
    }

    return (
        <section className={s.root__commentSection}>
            <form className={s.root__commentForm} onSubmit={handleSubmit(onSubmit)}>
                <TextareaField
                    {...register("text", {
                        required: "The field is required"
                    })}
                    placeholder='Text'
                    error={errors.text}
                    className={s.root__commentTextarea}
                />

                <Button className={s.root__commentButton} type="submit">
                    Post a comment
                </Button>
            </form>

            <div className={s.root__comments}>
                {
                    comments.map((comment) => (
                        <div key={comment.id} className={s.root__comment}>
                            <span>
                                <Moment fromNow>{comment.createdAt}</Moment>
                            </span>

                            <div>
                                {comment.text}
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default ArticleComments