import { loginSchema } from "../auth.schema"
import authServices from "../auth.services";
import type { InferType } from 'yup';
import type { UseLoginReturn } from "../auth.interfaces";
import { useAppStore } from "@/stores/app";

type LoginForm = InferType<typeof loginSchema>;

export default function useLogin(): UseLoginReturn {
    const Store = useAppStore()
    const Router = useRouter()
    const showPass = ref<boolean>(false)

    const { handleSubmit } = useForm<LoginForm>({
        validationSchema: loginSchema
    })

    const email = useField<string>('email')
    const pass = useField<string>('pass')

    const loginUser = handleSubmit(values => {
        loginMutation.mutate({ email: values.email, password: values.pass })
    })

    const loadButton = computed(() => loginMutation.isPending.value || false)

    const toFirstRoute = () => {
        Promise.all([
            Store.fetchRoutes(),
            // Store.fetchUserInfo() // verificar usuario
        ]).then(() => {
            const route = Store.menuRoutes[0]
            // Router.push({ name: route.uri })
            Router.push({ name: 'dashboard' })
        })
    }

    const loginMutation = useMutation({
        mutationFn: authServices.login,
        onSuccess: (resp) => {
            const { token, refresh_token, user } = resp

            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refresh_token)
            Store.userInfo = user

            toFirstRoute()
        }
    })

    onMounted(() => {
        Store.$reset()
    })

    return {
        email,
        pass,
        showPass,
        loadButton,

        loginUser
    }

}