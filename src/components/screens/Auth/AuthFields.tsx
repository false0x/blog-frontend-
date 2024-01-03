import { FC } from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import s from "./Auth.module.scss";
import { IAuthInput } from "./auth.interface";
import Field from '@/src/components/ui/form-elements/Field'

interface IAuthFields {
    register: UseFormRegister<any>
    formState: FormState<IAuthInput>
}

const AuthFields: FC<IAuthFields> = ({ register, formState: { errors } }) => {
    return (
        <>
            <Field
                {...register("username", {
                    required: "The field is required"
                })}
                placeholder='Username'
                error={errors.username}
                className={s.root__input}
            />

            <Field
                {...register("password", {
                    required: "The field is required"
                })}
                placeholder='Password'
                error={errors.password}
                className={s.root__input}
            />
        </>
    );
};

export default AuthFields;
