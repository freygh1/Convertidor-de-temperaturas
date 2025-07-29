// Accedemos a nuestros elementos:

const fromSelector = document.getElementById('from_selector')
const toSelector = document.getElementById('to_selector')
const inputValue = document.getElementById('input_value')
const convertBtn = document.getElementById('convert_btn')
const resultCtn = document.getElementById('result_ctn')
const resetBtn = document.getElementById('reset_btn')

const limpiarInput = () => inputValue.value = ''

const cambiarPlaceholder = () => {
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

const actualizarEscala = (escala) => {
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
      cambiarPlaceholder()
      actualizarEscala(fromSelector.value)
      fromSelector.addEventListener('change', (seleccion) => {
            limpiarInput()
            cambiarPlaceholder()
            actualizarEscala(seleccion.target.value)
      })
      toSelector.addEventListener('change', () => {
            limpiarInput()
            cambiarPlaceholder()
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
      resultCtn.textContent = calculosEntreEscalas(
            inputValue.value,
            fromSelector.value,
            toSelector.value
      )
})


/**Queda por agregar:
 * Funcionalidad que borre el resultado al editar o cambiar de escalas, no solo el input
 * Funcionalidad del resetBtn para reseteo manual
 * Agregar otras escalas de temperatura
 */