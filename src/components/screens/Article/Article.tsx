import { FC, useEffect, useState } from 'react'
import s from './Article.module.scss'
import { useArticles } from '@/src/components/screens/Article/useArticle'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import ArticleComments from '@/src/components/screens/Article/ArticleComments/ArticleComments'

const Article: FC = () => {
    const { data, articleId, refetch } = useArticles()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    useEffect(() => {
        if (data?.content) {
            const contentState = convertFromRaw(JSON.parse(data.content.toString()))
            const newEditorState = EditorState.createWithContent(contentState)
            setEditorState(newEditorState)
        }
    }, [data])

    if (!data?.content) return <div className={s.root}>Loading...</div>

    return (
        <div className={s.root}>
            <div className={s.root__title}>
                {data?.title}
            </div>

            <Editor
                editorState={editorState!}
                readOnly={true}
                onChange={() => {}}
            />

            <ArticleComments id={articleId} refetch={refetch} comments={data?.comments!} />
        </div>
    )
}

export default Article