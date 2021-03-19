import react from react
import auth from "@react-native-firebase/auth"
import { createContext, useState } from "react"

export const AuthContext = createContext()

const [use , setUser] = useState(null)
export const AuthProvider = ({children}) => {
    return (
        <AuthProvider.Provider
            value ={{
                user, setUser ,
                login: async (email , password) =>{

                    try{

                        await  auth().signInWithEmailAndPassword(email , password)

                    } catch(e){
                        console.log(`There was an error ${e}`)
                    }

                },
                logout: async () => {
                    try{
                        await auth().signOut();
                    } catch(e)
                    {
                        console.log(`There was a signout error ${e}`)
                    }
                }

                

            }}
        
        >
            {children}
        </AuthProvider.Provider>
    )
}