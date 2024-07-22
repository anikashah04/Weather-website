console.log('Client side javascript file is loaded')


const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
// messageOne.textContent='From JS'

//first parameter is event and second is callback
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=searchElement.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                {
                    messageOne.textContent=data.error
                }else{
                    messageOne.textContent=data.location
                    messageTwo.textContent=data.forecast
                }
            
        })
    })
})