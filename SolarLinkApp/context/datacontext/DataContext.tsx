import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { AuthContext } from "../AuthContext/AuthContext";


interface UserData {
  name: string;
  lastname: string;
  email: string;
  username: string;
  [key: string]: any;
}

interface ConsumoRealData {
  battery: number;
  batteryLevel: number;
  grid: number;
  home: number;
  solar: number;
}

interface ConsumptionData {
  hourlyData: any[];
  weeklyData: any[];
  monthlyData: any[];
}

interface DataContextProps {
  userData: UserData | null;
  consumptionData: ConsumptionData | null;
  isLoading: boolean;
  consumoReal: ConsumoRealData | null;
}

export const DataContext = createContext<DataContextProps>({
  userData: null,
  consumptionData: null,
  isLoading: true,
  consumoReal: null,
});

export const DataProvider = ({ children }: any) => {
  const { state } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [consumptionData, setConsumptionData] = useState<ConsumptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consumoReal, setConsumoReal] = useState<ConsumoRealData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (state.user) {
        setIsLoading(true);
        try {
          // Obtener datos del usuario
          const docRef = doc(db, "Users", state.user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            console.error("No se encontraron datos para este usuario.");
          }

          // Obtener datos de consumo
          const hourlyData: any[] = [];
          const weeklyData: any[] = [];
          const monthlyData: any[] = [];

          const hoursCollectionRef = collection(db, "Users", state.user.uid, "ConsumoHoras");
          const weekCollectionRef = collection(db, "Users", state.user.uid, "ConsumoSemanal");
          const monthCollectionRef = collection(db, "Users", state.user.uid, "ConsumoMensual");

          const hourlySnap = await getDocs(hoursCollectionRef);
          hourlySnap.forEach((doc) => {
            hourlyData.push(doc.data());
          });

          const weeklySnap = await getDocs(weekCollectionRef);
          weeklySnap.forEach((doc) => {
            weeklyData.push(doc.data());
          });

          const monthlySnap = await getDocs(monthCollectionRef);
          monthlySnap.forEach((doc) => {
            monthlyData.push(doc.data());
          });

          setConsumptionData({ hourlyData, weeklyData, monthlyData });
        } catch (error) {
          console.error("Error al obtener datos:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserData(null);
        setConsumptionData(null);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [state.user]);

  useEffect(() => {
    if (state.user) {
      const consumoRef = collection(db, "Users", state.user.uid, "ConsumoReal");
      const unsubscribe = onSnapshot(consumoRef, (snapshot) => {
        const newData: ConsumoRealData[] = [];
        snapshot.forEach((doc) => {
          newData.push(doc.data() as ConsumoRealData);
        });
        setConsumoReal(newData[0]); // Usar el primer documento de la colección
      });

      return () => unsubscribe();
    }
  }, [state.user]);

  return (
    <DataContext.Provider value={{ userData, consumptionData, isLoading, consumoReal }}>
      {children}
    </DataContext.Provider>
  );
};
