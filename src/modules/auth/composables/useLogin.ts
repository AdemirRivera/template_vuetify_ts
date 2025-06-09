import { opinionesSchema } from "../login.schema"
import authServices from "../auth.services";
import type { InferType } from 'yup';
import type { UseLoginReturn } from "../auth.interfaces";

type LoginForm = InferType<typeof opinionesSchema>;

export default function useLogin(): UseLoginReturn {
    const showPass = ref<boolean>(false)

    const { handleSubmit } = useForm<LoginForm>({
        validationSchema: opinionesSchema
    })

    const email = useField<string>('email')
    const pass = useField<string>('pass')

    const loginUser = handleSubmit(values => {
        loginMutation.mutate({ email: values.email, password: values.pass })
    })

    const loginMutation = useMutation({
        mutationFn: authServices.login,
        onSuccess: (data) => {
            const { token, refresh_token: refreshToken } = data

            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refreshToken)
        }
    })

    return {
        email,
        pass,
        showPass,

        loginUser
    }

}