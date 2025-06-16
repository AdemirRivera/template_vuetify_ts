import { useAppStore } from "@/stores/app"

/**
 * @param permissions
 * @description Verifica si el usuario posee ese permiso (argumento).
 * @returns boolean
 */
export const checkPermission = (...permissions: string[]): boolean => {
    const Store = useAppStore()
    const userPermissions = Store.userInfo.permisos
    return permissions.every((permission: string) => userPermissions?.includes(permission))
}

/**
 * @param value
 * @description Verifica si el valor proporcionado es un dui valido.
 * @returns boolean
 */
export const verifyDUI = (value: string): boolean => {
    let isValid = false;

    if (value.length === 10 && value !== "00000000-0") {
        const [digitsStr, validatorStr] = value.split("-");

        if (digitsStr !== undefined && validatorStr !== undefined && validatorStr.length === 1) {
            const validator = parseInt(validatorStr, 10);
            const digits = digitsStr.split("").map((char) => parseInt(char, 10));

            if (digits.every((digit) => !isNaN(digit))) {
                const sum = digits.reduce((total, digit, index) => total + digit * (9 - index), 0);
                let mod = sum % 10;
                mod = validator === 0 && mod === 0 ? 10 : mod;

                const diff = 10 - mod;

                if (diff === validator) {
                    isValid = true;
                }
            }
        }
    }

    return isValid;
}

/**
 * @param value
 * @description Verifica si el valor proporcionado es un nit valido.
 * @returns boolean
 */
export const VerifyNitFn = (value: string): boolean => {
    if (value.length !== 17 || value === "0000-000000-000-0") {
        return false;
    }

    if (!/^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/.test(value)) {
        return false;
    }

    const [location, date, sequence, checkDigitStr] = value.split("-");
    const digits = (location + date + sequence).split("").map(Number);

    if (digits.some((digit) => isNaN(digit))) {
        return false;
    }

    let sum = 0;
    let mod: number;

    if (parseInt(sequence, 10) <= 100) {
        sum = digits.reduce((total, digit, index) => total + digit * (14 - index), 0);
        mod = sum % 11;
        mod = mod === 10 ? 0 : mod;
    } else {
        sum = digits.reduce(
            (total, digit, index) =>
                total + digit * (3 + 6 * Math.floor((index + 5) / 6) - (index + 1)),
            0
        );
        mod = sum % 11;
        mod = mod > 1 ? 11 - mod : 0;
    }

    return mod === parseInt(checkDigitStr, 10);
};
