import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
    

const defaultValues: AuthState = {
    user: undefined,
    isLogged: false,
};

interface AuthContextProps {
    state: any;  
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>; 
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const auth = getAuth();
    const [state, dispatch] = useReducer(authReducer, defaultValues);
    
    useEffect(() => {
        console.log(state);
    }, [state]);
    
    const login = async (email: string, password: string) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            dispatch({
                type: "LOGIN",
                payload: response.user,
            });
        } catch (error) {
            console.error("Error during login:", error);
            throw error; // Re-lanzar el error para manejarlo en el componente
        }
    };
    
    const signup = async (email: string, password: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            dispatch({ type: "LOGIN", payload: response.user });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                state,
                login,
                signup,
            }}
        >     
            {children}
        </AuthContext.Provider>
    );
};
