import {mongoose} from "mongoose"
import { OutputType, print } from "../heplers/print.js"
import Exception from "../Exception/Exception.js"

async function connect(){
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)

        print("Connection mongoose successfull",OutputType.SUCCESS)    
        return connection
    } catch (error) {
       console.log(error.message)

        const {code} = error
        if (error.code == 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        }
        else if(code == undefined){
          
            throw new Exception(Exception.WRONG_CONECTION_STRING)

        }
        
        // repl
        // error
        // Object.keys(error)
        throw new Exception (Exception.CANNOT_CONNECT_MONGODB)
        
    }
}

export default connect