import { permissionSchema } from '../settings.schemas'
import permissionsServices from '../services/permissions.services'
import type { InferType } from 'yup'
import type { DataListPermissions } from '../interfaces/permissions.interfaces'
import type { Ref } from 'vue'

type PermissionForm = InferType<typeof permissionSchema>

interface ActionOption {
    id: number
    name: string
}

export default function useFormPermission(
    emit: (event: 'reset') => void,
    mode: Ref<'create' | 'edit'>,
    initialValues: Ref<DataListPermissions | null>,
    modelValue: Ref<boolean | undefined> = ref(false)
) {

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

    const { handleSubmit, handleReset, setValues } = useForm<PermissionForm>({
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
            modelValue.value = false
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

    watch(() => modelValue.value, (newValue) => {
        if (newValue && mode.value === 'edit' && initialValues.value) {
            setValues({
                action: optionActions.find(opt => opt.name === initialValues.value?.name.split('_')[0]),
                prefix: initialValues.value.name.split('_')[0] === 'OTRO' ? initialValues.value.name.split('_')[1] : '',
                name: initialValues.value.name.split('_')[1] || '',
                description: initialValues.value.description || '',
                tag: initialValues.value.tag || ''
            })
        }
    })

    return {
        optionActions,
        action,
        prefix,
        name,
        description,
        tag,
        namePrefix,
        createPermission,
        handleReset,
        modelValue
    }
}
