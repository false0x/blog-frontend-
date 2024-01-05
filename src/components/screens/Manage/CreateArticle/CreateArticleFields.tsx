import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { IAuthInput } from '@/src/components/screens/Auth/auth.interface'
import Field from '@/src/components/ui/form-elements/Field'
import s from './CreateArticle.module.scss'
import { ICreateArticle } from '@/src/components/screens/Manage/CreateArticle/create-article.interface'


interface ICreateArticleFields {
    register: UseFormRegister<any>
    formState: FormState<ICreateArticle>
}

const CreateArticleFields: FC<ICreateArticleFields> = ({ register, formState: { errors } }) => {
    return (
        <>
            <div className={s.root__titleInput}>
                <Field
                    {...register("title", {
                        required: "The field is required"
                    })}
                    placeholder='Title'
                    error={errors.title}
                    className={s.root__titleInput}
                />
            </div>
        </>
    );
};

export default CreateArticleFields;
