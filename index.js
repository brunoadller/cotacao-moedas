let valuesObj = [
  {
    dolar: 0,
    dolarTitle: '',
    euro: 0,
    euroTitle: ''
  }
]

let value = document.getElementById('value')

fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
.then(data => data.json())
.then(body => {
  console.log(body)
  valuesObj.push(
    {
      dolar: parseFloat(body.USDBRL.low),
      euro:  parseFloat(body.EURBRL.low),
    })
}).catch(e => {
  console.log("Erro ao fazer a requisição: ", e)
})

const arrow = document.getElementById('arrow')
const options = document.getElementById('options-container')
const optionSelected = document.getElementById('option-selected')
const country = document.getElementById('country')
let item = []
let  obj = ['Dolar', 'Euro']
let isRotate = false

document.addEventListener('DOMContentLoaded', function() {
  createDiv()
  selectOption()
})


const rotateArrow = () => {
  
  if(isRotate == false){
    rotate(180)
    showOptions('block')
    isRotate = true
  }else if(isRotate == true){
    rotate(0)
    showOptions('none')
    isRotate = false
  }
}


const createDiv = () => {
  for(let i = 0; i < 2; i++){
    item[i] = document.createElement('div')
    item[i].className = 'option'
    item[i].id = `option${i}`
    item[i].textContent = obj[i]
    options.appendChild(item[i])
  } 
}
const selectOption = () => {
  showOptions('none')

  let dolar= document.getElementById(`option${0}`)
  let euro = document.getElementById(`option${1}`)
  
  dolar.addEventListener('click', () => {
    showOptions('none')
    rotate(0)
    isRotate = false
    optionSelected.textContent = obj[0]
    let num = valuesObj.map(item => item.dolar)
    value.textContent = `R$ ${num[1].toFixed(2)}`
  })
  euro.addEventListener('click', () => {
    showOptions('none')
    rotate(0)
    isRotate = false
    optionSelected.textContent = obj[1]
    let num = valuesObj.map(item => item.euro)
    value.textContent = `R$ ${num[1].toFixed(2)}`

  })
}

const rotate = (value) => {
   arrow.style.transform = `rotate(${value}deg)`
}
const showOptions = (display) => {
  options.style.display = display
}