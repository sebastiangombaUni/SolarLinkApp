import { createContext, useContext, useEffect, useReducer } from "react";
import { dataReducer } from "../DataContext/Datareducer";
import { AuthContext } from "../AuthContext/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

export interface DataState {    
    user: any;
}
const dataStateDefault: DataState = {
   
    user: null,
  };

interface DataContextProps {
    state: DataState;
   
  }

export const DataContext = createContext({} as DataContextProps);


export function DataProvider({ children }: any) {
    const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
    const { state: authState } = useContext(AuthContext);
    const { user } = authState;
 
    useEffect(() => {
        if (user) {
          getUser(); // Obtén la información del usuario
   
        }
      }, [user]);  
      

      const getUser = async () => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "Users", user.uid));
            if (userDoc.exists()) {
              dispatch({ type: "setUser", payload: userDoc.data() });
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.log("Error getting user: ", error);
          }
        }
      };
      
    return <DataContext.Provider value={{ state,  }}>{children}</DataContext.Provider>;
}