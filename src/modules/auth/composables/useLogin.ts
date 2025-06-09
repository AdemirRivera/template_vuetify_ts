import { opinionesSchema } from "../login.schema"
import authServices from "../auth.services";
import type { InferType } from 'yup';

type LoginForm = InferType<typeof opinionesSchema>;

interface UseLoginReturn {
    email: string;
    pass: string;
    showPass: Ref<boolean>;
    loginUser: () => void;
}

export default function useLogin<UseLoginReturn>() {
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
            const { token, refresh_token: refreshToken } = data.data

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