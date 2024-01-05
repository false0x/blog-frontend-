export interface IArticle {
    id: number
    title: string
    content: string
    shortContent: string
    createdAt: Date
    updatedAt: Date
    comments: Comment[]
}

export interface Comment {
    id: number
    text: string
    createdAt: string
    articleId: number
}

export interface IArticleCreate {
    content: string
    shortContent: string
    title: string
}