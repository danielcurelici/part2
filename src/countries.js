import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {

    const [countries, setCountries] = useState(null)
    const [value, setValue] = useState('')

    useEffect(() => {
    
        if(value){
            axios
              .get(`https://restcountries.com/v3.1/name/${value}`)
              .then(response => {
                  response = response.data;
                  setCountries(response)
                  console.log(response)
              })

        }
        
      }, [value])    
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return(
        <div>
            <form>
                find countries <input value={value} onChange={handleChange}></input>
            </form>
            <p>
                {(JSON.stringify(countries, null, 2))[0].name}
            </p>        
      </div>
    )
    
}

export default App