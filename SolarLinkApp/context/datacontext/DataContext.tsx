import React, { createContext, useContext, useReducer, useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";  // Ajusta la ruta según tu configuración de Firebase

// Tipos de datos que manejará el contexto
export interface DataState {
  user: any;  // Aquí puedes ajustar el tipo de usuario según tus necesidades
  hourlyData: ConsumptionData[];
  weeklyData: ConsumptionData[];
  monthlyData: ConsumptionData[];
  loading: boolean;
}

interface ConsumptionData {
  name: string;
  value: number;
}

const dataStateDefault: DataState = {
  user: null,
  hourlyData: [],
  weeklyData: [],
  monthlyData: [],
  loading: true,
};

// Acción para actualizar el estado del usuario
const SET_USER = 'setUser';

interface DataContextProps {
  state: DataState;
  setUser: (user: any) => void;
  fetchConsumptionData: () => void;
}

export const DataContext = createContext({} as DataContextProps);

// Reducer para manejar el estado del DataContext
const dataReducer = (state: DataState, action: any): DataState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};

export const DataProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
  const [loading, setLoading] = useState(true);  // Estado de carga adicional

  // Función para obtener los datos de consumo de Firestore
  const fetchConsumptionData = async () => {
    if (!state.user) return;
    const { uid } = state.user;

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

      dispatch({ type: 'setConsumptionData', payload: { hoursData, weekData, monthData } });
    } catch (error) {
      console.error('Error al obtener los datos de Firestore:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los datos del usuario
  const getUser = async () => {
    if (state.user) {
      try {
        const userDoc = await getDoc(doc(db, "Users", state.user.uid));
        if (userDoc.exists()) {
          dispatch({ type: SET_USER, payload: userDoc.data() });
        } else {
          console.log("No se encontró el documento del usuario.");
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario: ", error);
      }
    }
  };

  useEffect(() => {
    if (state.user) {
      fetchConsumptionData();  // Obtiene los datos de consumo cuando el usuario está disponible
    }
  }, [state.user]);

  return (
    <DataContext.Provider value={{ state, setUser: getUser, fetchConsumptionData }}>
      {children}
    </DataContext.Provider>
  );
};
