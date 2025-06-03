export default function useRecoverPass() {
    const isActive = ref<boolean>(false)
    const showModalConf = ref<boolean>(false)
    
    return {
        isActive,
        showModalConf
    }
}