import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import Field from '@/src/components/ui/form-elements/Field'
import s from './CreateArticle.module.scss'
import { IArticleCreate } from '@/src/services/article/article.interface'


interface ICreateArticleField {
    register: UseFormRegister<any>
    formState: FormState<IArticleCreate>
}

const CreateArticleField: FC<ICreateArticleField> = ({ register, formState: { errors } }) => {
    return (
        <>
            <div className={s.root__titleInput}>
                <Field
                    {...register("title", {
                        required: "The field is required",
                        minLength: 1
                    })}
                    placeholder='Title'
                    error={errors.title}
                    className={s.root__titleInput}
                />
            </div>
        </>
    );
};

export default CreateArticleField;
