// Accedemos a nuestros elementos:
const fromSelector = document.getElementById('from_selector')
const toSelector = document.getElementById('to_selector')
const inputValue = document.getElementById('input_value')
const convertBtn = document.getElementById('convert_btn')
const resultCtn = document.getElementById('result_ctn')
const resetBtn = document.getElementById('reset_btn')

// Estas funciones limpia el valor introducido y el resultado obtenido, respectivamente
const limpiarInput = () => inputValue.value = ''
const limpiarResultado = () => resultCtn.innerHTML = ''

// Se verifica que las escalas no sean iguales
const verificarValidez = () => {
      if (fromSelector.value === toSelector.value) {
            inputValue.setAttribute('disabled', 'true')
            convertBtn.setAttribute('disabled', 'true')
            inputValue.setAttribute('placeholder', 'Las escalas no pueden ser iguales')
      }
      else {
            convertBtn.removeAttribute('disabled')
            inputValue.removeAttribute('disabled')
            inputValue.setAttribute('placeholder', 'Digita valor a convertir...')
      }
}

// Segun la escala que sea, se actualizara el valor minimo que se pueda insertar
const actualizarValorMinimoDeLaEscala = (escala) => {
      switch (escala) {
            case "kelvin":
                  inputValue.min = "0"
                  break;
            case "celsius":
                  inputValue.min = "-273.15"
                  break;
            case "fahrenheit":
                  inputValue.min = "-459.67"
                  break
            default:
                  inputValue.min = "0"
      }
}

// Al seleccionar la escala a convertir...:
const seleccionDeEscala = () => {
      verificarValidez() //Se verifica que no sean iguales.
      actualizarValorMinimoDeLaEscala(fromSelector.value) //Toma el selector desde donde se hara la conversion como referencia.

      fromSelector.addEventListener('change', (seleccion) => {
            limpiarInput()
            limpiarResultado()
            verificarValidez()
            actualizarValorMinimoDeLaEscala(seleccion.target.value)
            // Se ejecutan estas funciones en cada cambio
      })

      toSelector.addEventListener('change', () => {
            limpiarInput()
            limpiarResultado()
            verificarValidez()
            // Se ejecutan estas funciones en cada cambio
      })
}

seleccionDeEscala() //Se llama a la funcion para que esté siempre funcionando.

// 
const calculosEntreEscalas = (num, from, to) => {
      let resultados;
      num = parseFloat(num)

      // Se convertira a celsius primero (asi se simplifica la colocacion de formulas)
      let celsius;
      if (from === 'kelvin') {
            celsius = num - 273.15
      } else if (from === 'fahrenheit') {
            celsius = (num - 32) * (5 / 9)
      } else {
            celsius = num
      }

      // Ahora, la conversion final segun hacia a que escala se desee convertir
      if (to === 'kelvin') {
            resultados = celsius + 273.15
      } else if (to === 'fahrenheit') {
            resultados = celsius * (9 / 5) + 32
      } else {
            resultados = celsius
      }

      // Redondea los resultados a dos decimales.
      return `${resultados.toFixed(2)} °${toSelector.value}`
}

// Al hacer click al boton convertir se llevan a cabo 3 pasos...:
convertBtn.addEventListener('click', () => {
      if (!inputValue.value) { //Se verifica si el input esta vacio y lanza el texto de sugerencia
            resultCtn.textContent = 'Ingresa el dígito a convertir'
      } else if (inputValue.value && parseFloat(inputValue.value) < parseFloat(inputValue.min)) { //Si no esta vacio, evalua si el valor que tiene es menor al minimo y lanza una sugerencia.
            resultCtn.textContent = 'El valor es menor al mínimo'
      }
      else { //Si el resultado es valido, se muestra el resultado
            resultCtn.textContent = calculosEntreEscalas(
                  inputValue.value,
                  fromSelector.value,
                  toSelector.value
            )
      }
})

// Permite ejecutar el boton de conversion con la tecla 'Enter'
inputValue.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
            return convertBtn.click()
      }
})

// Reinicia todo al estado por defecto
resetBtn.addEventListener('click', () => {
      limpiarResultado()
      limpiarInput()
      if (fromSelector.value !== 'kelvin') {
            fromSelector.value = 'kelvin'
      }

      if (toSelector.value !== 'kelvin') {
            toSelector.value = 'kelvin'
      }
      verificarValidez()
      // Lo ultimo agregado:
})
