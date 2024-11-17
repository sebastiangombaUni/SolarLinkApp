import { createContext, useEffect, useReducer, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { authReducer, AuthState } from "./AuthReducer";
import { auth, db } from "../../utils/firebaseConfig";
import { generateHourlyData, generateMonthlyData, generateWeeklyData } from "../generetor";

const defaultValues: AuthState = {
    user: undefined,
    isLogged: false,
};

interface ConsumptionData {
    name: string;
    value: number;
}

interface AuthContextProps {
    state: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, password: string, name: string, lastname: string, username: string) => Promise<void>;
    currentUserId: () => string | undefined;
    loading: boolean;
    hourlyData: ConsumptionData[];
    weeklyData: ConsumptionData[];
    monthlyData: ConsumptionData[];
    fetchConsumptionData: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const auth = getAuth();
    const [user, setUser] = useState<any>(null);
    const [state, dispatch] = useReducer(authReducer, defaultValues);
    const [hourlyData, setHourlyData] = useState<ConsumptionData[]>([]);
    const [weeklyData, setWeeklyData] = useState<ConsumptionData[]>([]);
    const [monthlyData, setMonthlyData] = useState<ConsumptionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await fetchConsumptionData();
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchConsumptionData = async () => {
        if (!user) return;
        const { uid } = user;
        try {
            const hoursCollectionRef = collection(db, 'Users', uid, 'ConsumoHoras');
            const weekCollectionRef = collection(db, 'Users', uid, 'ConsumoSemanal');
            const monthCollectionRef = collection(db, 'Users', uid, 'ConsumoMensual');

            const [hourSnapshot, weekSnapshot, monthSnapshot] = await Promise.all([
                getDocs(query(hoursCollectionRef)),
                getDocs(query(weekCollectionRef)),
                getDocs(query(monthCollectionRef)),
            ]);

            const hoursData = hourSnapshot.docs.map((doc) => ({
                name: doc.data().hour,
                value: doc.data().value,
            }));

            const weekData = weekSnapshot.docs.map((doc) => ({
                name: doc.data().date,
                value: doc.data().value,
            }));

            const monthData = monthSnapshot.docs.map((doc) => ({
                name: doc.data().month,
                value: doc.data().value,
            }));

            setHourlyData(hoursData);
            setWeeklyData(weekData);
            setMonthlyData(monthData);
        } catch (error) {
            console.error('Error al obtener los datos de Firestore:', error);
        }
    };

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
                fetchConsumptionData,
                hourlyData,
                weeklyData,
                monthlyData,
                loading,
                login,
                signup,
                currentUserId: () => state.user?.uid
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
