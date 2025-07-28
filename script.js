// Accedemos a nuestros elementos:

const fromSelector = document.getElementById('from_selector')
const toSelector = document.getElementById('to_selector')
const inputValue = document.getElementById('input_value')
const convertBtn = document.getElementById('convert_btn')
const resultCtn = document.getElementById('result_ctn')
const resetBtn = document.getElementById('reset_btn') 

        
const limpiarInput = () => inputValue.value = ''

const seleccionDeEscala = () =>{
   fromSelector.addEventListener('change', (seleccion) =>{
        limpiarInput()  
        switch (seleccion.target.value) {
        case "kelvin":
        inputValue.min = "0" 
        break;        
        case "celsius":
        inputValue.min = "-273.15"
        break;
        case "fahrenheit":
        inputValue.min = "-459.67"
        break
    }
  })
}

seleccionDeEscala()

// function verificarValidezDelValor() {
  
// }


