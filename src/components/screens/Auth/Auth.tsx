import { FC } from 'react'
import s from './Auth.module.scss'
import AuthFields from '@/src/components/screens/Auth/AuthFields'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from '@/src/components/screens/Auth/auth.interface'
import { useAuthRedirect } from '@/src/hooks/useAuthRedirect'
import { useAuth } from '@/src/hooks/useAuth'
import { useActions } from '@/src/hooks/useActions'
import Button from '@/src/components/ui/form-elements/Button'

const Auth: FC = () => {
    useAuthRedirect()

    const { isLoading } = useAuth()

    const { login } = useActions()

    const { register, handleSubmit, formState, reset } = useForm<IAuthInput>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IAuthInput> = async (data) => {
        await login(data)

        reset()
    }

    return (
        <div className={s.root}>
            <form className={s.rootForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.rootFormTitle}>
                    Log in
                </div>

                <div className={s.rootFormInputs}>
                    <AuthFields register={register} formState={formState} />
                </div>

                <Button className={s.rootFormButton} disabled={isLoading}>
                    Log in
                </Button>
            </form>
        </div>
    )
}

export default Auth