console.log('cliente side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search =document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?adress='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = 'City not found'
            messageTwo.textContent = 'Try Again'
        }else
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
    })
    
})

    console.log(location)
})