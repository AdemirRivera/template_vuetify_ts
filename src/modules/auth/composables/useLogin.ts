import { opinionesSchema } from "../login.schema"
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
        console.log(values);
    })

    return {
        email,
        pass,
        showPass,

        loginUser
    }

}