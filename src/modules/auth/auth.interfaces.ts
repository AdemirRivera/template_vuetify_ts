import type { User } from "@/interfaces/general.interface";
import type { FieldContext } from "vee-validate";
import type { Ref } from 'vue'

export interface UseLoginReturn {
    email: FieldContext<string>;
    pass: FieldContext<string>;
    showPass: Ref<boolean>;
    loadButton: Ref<boolean>;
    loginUser: () => void;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refresh_token: string;
    expires_at: string,
    user: User
}