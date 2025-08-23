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

// Se establece el valor minimo o maximo que se pueda insertar
const valorMinimoDeLaEscala = () => {
  return inputValue.min = "-10000000"
}

const valorMaximoDeLaEscala = () => {
  return inputValue.max = "10000000"
}

//Se llama a las funciones para que estén siempre funcionando.
valorMinimoDeLaEscala()
valorMaximoDeLaEscala()

// Al seleccionar la escala a convertir...:
const seleccionDeEscala = () => {
  verificarValidez() //Se verifica que no sean iguales.

  fromSelector.addEventListener('change', () => {
    limpiarInput()
    limpiarResultado()
    verificarValidez()
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
  // se crea una variable para almacenar los resultados finales
  let resultados;
  // Se asegura de que el numero final al pasarse no tenga simbolos incluidos
  num = parseFloat(num)

  // Se convertira a m/s primero (asi se simplifica la colocacion de formulas)
  let metrosPorSegundo;
  if (from === 'm/s') {
    metrosPorSegundo = num
  } else if (from === 'km/h') {
    metrosPorSegundo = num / 3.6
  } else if (from === 'mph') {
    metrosPorSegundo = num * 0.44704
  } else if (from === 'ft/s') {
    metrosPorSegundo = num * 0.3048
  } else {
    metrosPorSegundo = num * 0.514444
  }

  // Ahora, la conversion final segun hacia a que escala se desee convertir
  if (to === 'm/s') {
    resultados = metrosPorSegundo 
  } else if (to === 'km/h') {
    resultados = metrosPorSegundo  * 3.6
  } else if (to === 'mph') {
    resultados = metrosPorSegundo  * 2.23694
  } else if (to === 'ft/s') {
   resultados =  metrosPorSegundom * 3.28084
  } else {
    resultados = metrosPorSegundo  * 1.94384
  }

  // Redondea los resultados a dos decimales.
  return `${resultados.toFixed(2)} ${toSelector.value}`
}

// Al hacer click al boton convertir se llevan a cabo 3 pasos...:
convertBtn.addEventListener('click', () => {
  if (!inputValue.value) { //Se verifica si el input esta vacio y lanza el texto de sugerencia
    resultCtn.textContent = 'Ingresa el dígito a convertir'
  }

  //Si no esta vacio, evalua si el valor que tiene esta fuera de los limites y lanza una sugerencia.
  else if (inputValue.value && parseFloat(inputValue.value) < parseFloat(inputValue.min) || parseFloat(inputValue.value) > parseFloat(inputValue.max)) {
    resultCtn.textContent = 'El valor es invalido'
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
  if (fromSelector.value !== 'm/s') {
    fromSelector.value = 'm/s'
  }

  if (toSelector.value !== 'm/s') {
    toSelector.value = 'm/s'
  }
  verificarValidez()
})


// m/s
// km/h
// mph
// ft/s
// kn