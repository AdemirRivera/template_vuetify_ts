interface UseRecoverPassReturn {
    isActive: boolean,
    showModalConf: boolean
}

export default function useRecoverPass<UseRecoverPass>() {
    const isActive = ref<boolean>(false)
    const showModalConf = ref<boolean>(false)

    return {
        isActive,
        showModalConf
    }
}