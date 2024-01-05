import { FC, useEffect, useState } from 'react'
import s from './EditArticle.module.scss'
import { useArticleEdit } from '@/src/components/screens/Manage/EditArticle/useEditArticle'
import { useForm } from 'react-hook-form'
import CreateArticleFields from '@/src/components/screens/Manage/CreateArticle/CreateArticleFields'
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js'
import Button from '@/src/components/ui/form-elements/Button'
import { IArticleCreate } from '@/src/services/articles/articles.interface'
import { getAdminUrl } from '@/src/config/url.config'
import { useRouter } from 'next/router'
import { limitText } from '@/src/utils/limit-text'

const EditArticle: FC = () => {
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const { handleSubmit, formState, register, setValue } = useForm<IArticleCreate>({
        mode: 'onChange'
    })

    const { isLoading, onSubmit, articleData } = useArticleEdit(setValue)

    const router = useRouter()

    const returnToManage = () => router.push(getAdminUrl())

    const handleChange = (newState: EditorState) => {
        setEditorState(newState)
    }

    const handleFocus = () => {
        setShowPlaceholder(false)
    }

    const handleBlur = () => {
        setShowPlaceholder(!editorState.getCurrentContent().hasText())
    }

    useEffect(() => {
        if (!articleData) return

        const loadedContentState = convertFromRaw(JSON.parse(articleData?.data.content.toString()));

        const loadedEditorState = EditorState.createWithContent(loadedContentState);

        setEditorState(loadedEditorState)
    }, [articleData])

    const handleFormSubmit = () => {
        onSubmit({
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            shortContent: limitText(editorState.getCurrentContent().getPlainText()),
            title: String(articleData?.data.title),
        })
    }


    return (
        articleData ? (
            <form className={s.root} onSubmit={handleSubmit(handleFormSubmit)}>
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
        ) : (
            <div className={s.root}>loading...</div>
        )
    )
}

export default EditArticle