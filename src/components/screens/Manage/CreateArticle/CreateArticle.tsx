import { FC, useState } from 'react'
import s from './CreateArticle.module.scss'
import { convertToRaw, Editor, EditorState } from 'draft-js'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ICreateArticle } from '@/src/components/screens/Manage/CreateArticle/create-article.interface'
import CreateArticleFields from '@/src/components/screens/Manage/CreateArticle/CreateArticleFields'
import Button from '@/src/components/ui/form-elements/Button'
import { limitText } from '@/src/utils/limit-text'
import { toastError } from '@/src/utils/toast-error'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { useArticles } from '@/src/components/screens/Manage/useArticles'
import { ArticlesService } from '@/src/services/articles/articles.service'
import { IArticleCreate } from '@/src/services/articles/articles.interface'
import { useRouter } from 'next/router'
import { getAdminUrl } from '@/src/config/url.config'

const CreateArticle: FC = () => {
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const router = useRouter()

    const returnToManage = () => router.push(getAdminUrl())

    const { isLoading, mutateAsync } = useMutation(
        'create article',
        (data: IArticleCreate) => ArticlesService.create(data),
        {
            onSuccess: async () => {
                toast.success(`Article successfully created ✅`)
            },
            onError(error) {
                toast.error(`Error: ${error} ❌`)
            },
        },
    )

    const handleChange = (newState: EditorState) => {
        setEditorState(newState)
    }

    const { register, handleSubmit, formState } = useForm<ICreateArticle>({
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<ICreateArticle> = async (data) => {
        if (limitText(editorState.getCurrentContent().getPlainText()).length === 0) {
            return toast.error('The "Your story..." field cannot be empty')
        }

        const postData = {
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            shortContent: limitText(editorState.getCurrentContent().getPlainText()),
            title: data.title,
        }

        await mutateAsync(postData)

        returnToManage()
    }

    const handleFocus = () => {
        setShowPlaceholder(false)
    }

    const handleBlur = () => {
        setShowPlaceholder(!editorState.getCurrentContent().hasText())
    }

    return (
        <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
            <CreateArticleFields register={register} formState={formState} />

            <div className={s.root__contentInput}>
                {showPlaceholder && <div className={s.root__contentInputPlaceholder}>Your story...</div>}
                <Editor
                    editorState={editorState}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>

            <div className={s.root__bottomActions}>
                <span onClick={returnToManage}>Back</span>

                <Button disabled={isLoading} className={s.root__submitButton}>
                    Publish
                </Button>
            </div>
        </form>
    )
}

export default CreateArticle