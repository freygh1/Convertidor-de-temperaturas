// Accedemos a nuestros elementos:

const fromSelector = document.getElementById('from_selector')
const toSelector = document.getElementById('to_selector')
const inputValue = document.getElementById('input_value')
const convertBtn = document.getElementById('convert_btn')
const resultCtn = document.getElementById('result_ctn')
const resetBtn = document.getElementById('reset_btn')

const limpiarInput = () => inputValue.value = ''
const limpiarResultado = () => resultCtn.innerHTML = ''
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

const seleccionDeEscala = () => {
      verificarValidez()
      actualizarValorMinimoDeLaEscala(fromSelector.value)

      fromSelector.addEventListener('change', (seleccion) => {
            limpiarInput()
            limpiarResultado()
            verificarValidez()
            actualizarValorMinimoDeLaEscala(seleccion.target.value)
      })

      toSelector.addEventListener('change', () => {
            limpiarInput()
            limpiarResultado()
            verificarValidez()
      })
}

seleccionDeEscala()

const calculosEntreEscalas = (num, from, to) => {
      let resultados;
      num = parseFloat(num)
      // Se convertira a celsius primero
      let celsius;
      if (from === 'kelvin') {
            celsius = num - 273.15
      } else if (from === 'fahrenheit') {
            celsius = (num - 32) * (5 / 9)
      } else {
            celsius = num
      }

      // Ahora, la conversion final

      if (to === 'kelvin') {
            resultados = celsius + 273.15
      } else if (to === 'fahrenheit') {
            resultados = celsius * (9 / 5) + 32
      } else {
            resultados = celsius
      }

      return `${resultados.toFixed(2)} °${toSelector.value}`
}

convertBtn.addEventListener('click', () => {
      if (!inputValue.value) {
            resultCtn.textContent = 'Ingresa el dígito a convertir'
      } else if (inputValue.value && parseFloat(inputValue.value) < parseFloat(inputValue.min)) {
            resultCtn.textContent = 'El valor es menor al mínimo'
      }
      else {
            limpiarResultado()
            resultCtn.textContent = calculosEntreEscalas(
                  inputValue.value,
                  fromSelector.value,
                  toSelector.value
            )
      }
})

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



/**Queda por agregar:
 * Que se ejecute el convertBtn al presionar tecla enter
 */