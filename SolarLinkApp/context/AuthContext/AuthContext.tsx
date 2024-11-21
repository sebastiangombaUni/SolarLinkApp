import { createContext, useEffect, useReducer, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { authReducer, AuthState } from "./AuthReducer";
import { auth, db } from "../../utils/firebaseConfig";
import { generateEnergyData, generateHourlyData, generateMonthlyData, generateWeeklyData } from "../generetor";
import { router } from "expo-router";


const defaultValues: AuthState = {
    user: undefined,
    isLogged: false,
};


interface AuthContextProps {
    state: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, password: string, name: string, lastname: string, username: string) => Promise<void>;
    currentUserId: () => string | undefined;

}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const auth = getAuth();
    const [user, setUser] = useState<any>(null);
    const [state, dispatch] = useReducer(authReducer, defaultValues);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const docRef = doc(db, "Users", currentUser.uid);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    dispatch({
                        type: "LOGIN",
                        payload: { ...currentUser, ...userData }, // Combina datos de Firebase Auth y Firestore
                    });
                }
            } else {
                dispatch({ type: "LOGOUT" });
            }
        });
    
        return () => unsubscribe();
    }, []);
    


    const login = async (email: string, password: string) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            dispatch({
                type: "LOGIN",
                payload: response.user,
            });
        } catch (error) {
            console.error("Error durante el login:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            dispatch({ type: "LOGOUT" });
            router.push("/getStarted");
        } catch (error) {
            console.error("Error durante el logout:", error);
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string, lastname: string, username: string) => {
        try {
            const q = query(collection(db, "Users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                throw new Error("El nombre de usuario ya está en uso");
            }

            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            const uid = user.uid;

            await setDoc(doc(db, "Users", uid), {
                name,
                lastname,
                email,
                username,
            });

            // Generar y guardar datos de consumo aleatorio cuando se crea el usuario
            const hourlyData = generateHourlyData(); // 24 horas
            const weeklyData = generateWeeklyData(); // 7 días
            const monthlyData = generateMonthlyData(); // 3 meses
            const realData = generateEnergyData(); // 3 meses
            

            const hoursCollectionRef = collection(db, "Users", uid, "ConsumoHoras");
            for (const record of hourlyData) {
                await setDoc(doc(hoursCollectionRef), record);
            }

            const weekCollectionRef = collection(db, "Users", uid, "ConsumoSemanal");
            for (const record of weeklyData) {
                await setDoc(doc(weekCollectionRef), record);
            }

            const monthCollectionRef = collection(db, "Users", uid, "ConsumoMensual");
            for (const record of monthlyData) {
                await setDoc(doc(monthCollectionRef), record);
            }

            const realCollectionRef = collection(db, "Users", uid, "ConsumoReal");
            for (const record of realData) {
                await setDoc(doc(realCollectionRef), record);
            }

        
            dispatch({
                type: "LOGIN",
                payload: user,
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                logout,
                login,
                signup,
                currentUserId: () => state.user?.uid
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
