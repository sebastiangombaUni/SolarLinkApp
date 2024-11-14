
export interface AuthState{
    user?: any,
    isLogged: boolean
    
}

type ActionsProps = { type: "LOGIN", payload: any } |
{ type: "LOGOUT" }

export const authReducer = (state: AuthState, actions: ActionsProps): AuthState => {
    switch (actions.type) {
        case "LOGIN":
            return {
                ...state,
                user: actions.payload,
                isLogged: true
            }
        case "LOGOUT":
            return {
                ...state,
                user: undefined
            }
        default:
            return state
    }
}