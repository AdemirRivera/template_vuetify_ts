import { opinionesSchema } from "../login.schema"
import authServices from "../auth.services";
import type { InferType } from 'yup';
import type { UseLoginReturn } from "../auth.interfaces";
import { useAppStore } from "@/stores/app";

type LoginForm = InferType<typeof opinionesSchema>;

export default function useLogin(): UseLoginReturn {
    const Store = useAppStore()
    const router = useRouter()
    const showPass = ref<boolean>(false)

    const { handleSubmit } = useForm<LoginForm>({
        validationSchema: opinionesSchema
    })

    const email = useField<string>('email')
    const pass = useField<string>('pass')

    const loginUser = handleSubmit(values => {
        loginMutation.mutate({ email: values.email, password: values.pass })
    })

    const toFirstRoute = async () => {
        await Store.fetchRoutes()
        const route = Store.menuRoutes[0]
        router.push({ name: route.nombreUri })
    }

    const loginMutation = useMutation({
        mutationFn: authServices.login,
        onSuccess: (resp) => {
            const { token, refresh_token } = resp.data

            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refresh_token)

            toFirstRoute()
        }
    })

    return {
        email,
        pass,
        showPass,

        loginUser
    }

}