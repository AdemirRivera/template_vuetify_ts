import type { Directive } from 'vue'

const vUppercase: Directive<HTMLInputElement, void> = {
    mounted(el) {
        const handler = (e: Event) => {
            const input = e.target as HTMLInputElement
            input.value = input.value.toUpperCase()
            input.dispatchEvent(new Event('input'))
        }

        el.addEventListener('input', handler);
        // Guardamos handler en el elemento para removerlo después
        (el as any)._uppercaseHandler = handler
    },
    unmounted(el) {
        const handler = (el as any)._uppercaseHandler
        if (handler) {
            el.removeEventListener('input', handler)
            delete (el as any)._uppercaseHandler
        }
    }
}

export {
    vUppercase
}