import { opinionesSchema } from "../login.schema"

export default function useLogin() {
    const showPass = ref<Boolean>(false)

    const { handleSubmit, handleReset } = useForm({
        validationSchema: opinionesSchema
    })

    const email = useField('email')
    const pass = useField('pass')

    const loginUser = handleSubmit(values => {
        console.log(values);
    })

    return {
        email,
        pass,
        showPass,

        loginUser
    }

}