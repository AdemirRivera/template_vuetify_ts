import { permissionSchema } from '../settings.schemas'
import permissionsServices from '../services/permissions.services'
import type { InferType } from 'yup'

type PermissionForm = InferType<typeof permissionSchema>

interface ActionOption {
    id: number
    name: string
}

export default function useFormPermission(emit: (event: 'reset') => void) {
    const showDialog = ref(false)

    const optionActions: ActionOption[] = [
        { id: 1, name: 'VER' },
        { id: 2, name: 'LISTAR' },
        { id: 3, name: 'CREAR' },
        { id: 4, name: 'ACTIVAR' },
        { id: 5, name: 'EDITAR' },
        { id: 6, name: 'AGREGAR' },
        { id: 7, name: 'ELIMINAR' },
        { id: 8, name: 'OTRO' }
    ]

    const { handleSubmit, handleReset } = useForm<PermissionForm>({
        validationSchema: permissionSchema
    })

    const action = useField<ActionOption>('action')
    const prefix = useField<string>('prefix')
    const name = useField<string>('name')
    const description = useField<string>('description')
    const tag = useField<string>('tag')

    const namePrefix = computed(() => {
        if (action.value.value?.id) {
            if (action.value.value?.id === 8 && prefix.value.value) {
                return `${prefix.value.value}_`
            }
            return `${action.value.value.name}_`
        }
        return ''
    })

    const { mutate } = useMutation({
        mutationFn: permissionsServices.postNewPermission,
        onSuccess: data => {
            useNotification(data.data.message, { type: 'success' })
            emit('reset')
            closeModal()
        }
    })

    const createPermission = handleSubmit(values => {
        const fullName = values.action.id === 8
            ? `${values.prefix}_${values.name}`
            : `${values.action.name}_${values.name}`

        mutate({
            name: fullName,
            description: values.description,
            tag: values.tag
        })
    })

    const closeModal = () => {
        showDialog.value = false
        handleReset()
    }

    return {
        showDialog,
        optionActions,
        action,
        prefix,
        name,
        description,
        tag,
        namePrefix,
        createPermission,
        closeModal
    }
}
