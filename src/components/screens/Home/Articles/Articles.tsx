import { FC } from 'react'
import s from './Articles.module.scss'
import AdminImage from '@/public/articles/admin.svg'

const Articles: FC = () => {
    return (
        <div className={s.root}>
            <div className={s.root__articles}>
                <article className={s.root__article}>
                    <div className={s.root__articleInfo}>
                        <div className={s.root__articleAuthor}>
                            <AdminImage />

                            <span>root</span>
                        </div>

                        <span className={s.root__articleInfoSeparator}></span>

                        <div className={s.root__articleCreatedAt}>
                            4 days ago
                        </div>
                    </div>

                    <div className={s.root__articleTitle}>
                        Your portfolio is stopping you from getting that job
                    </div>

                    <div className={s.root__articleDescription}>
                        An intense way to learn about the process and practice your designs skills — My 1st hackathon Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer. As my portfolio...
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Articles