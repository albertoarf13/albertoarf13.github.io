var main = document.querySelector("#main")
var inputTitle = document.querySelector("#inputTitle")
var inputDate = document.querySelector("#inputDate")
var addButton = document.querySelector("#addButton")

inputDate.valueAsDate = new Date();

addButton.addEventListener("click", addNewEvent);




function Event(date, title){

    this.date = date
    this.title = title

}

class eventCard{
    constructor(date_input, title_input){

        this.date = new Date(date_input);

        this.title = document.createElement('p')
        this.title.innerHTML = title_input
        this.title.className = "title"

        this.fullDate = document.createElement('p')
        this.fullDate.innerHTML = this.date.getDate() + "/" + (this.date.getMonth()+1) + "/" + this.date.getFullYear()
        this.fullDate.className = "date"

        this.daysUntil = document.createElement('p')
        this.daysUntil.innerHTML = getDaysUntil(this.date) + " Days left"
        this.daysUntil.className = "daysLeft"

        this.deleteButton = document.createElement('button')
        this.deleteButton.innerHTML = "x"
        this.deleteButton.addEventListener('click', ()=>{
            //this.card.style = "display: none"
            this.newEvent.parentNode.removeChild(this.newEvent)
        })

        this.newEvent = document.createElement('div')
        this.newEvent.className = "eventCard"
        this.newEvent.appendChild(this.title)
        this.newEvent.appendChild(this.fullDate)
        this.newEvent.appendChild(this.daysUntil)
        this.newEvent.appendChild(this.deleteButton)

    }
}





var today_date = new Date();

let arrayEvents = []

if(localStorage.getItem("arrayEvents") != null){
    importEvents()
}


for(let i = 0 ; i < arrayEvents.length ; i++){
    writeEvent(arrayEvents[i].date, arrayEvents[i].title)
}






function writeEvent(date_input, title_input){

    let newEvent = new eventCard(date_input, title_input)

    main.append(newEvent.newEvent)

}


function addNewEvent(){

    writeEvent(new Date(inputDate.value), inputTitle.value)

    let event = new Event(new Date(inputDate.value), inputTitle.value)
    arrayEvents.push(event)

    exportEvents()
    
}


function getDaysUntil(date_input){

    var date_miliseconds = date_input.getTime();
    var today_miliseconds = today_date.getTime();
 
    return parseInt((date_miliseconds-today_miliseconds)/(24*3600*1000));

}


function importEvents(){
    arrayEvents = JSON.parse(localStorage.getItem('arrayEvents'))

    for(let i = 0; i < arrayEvents.length ; i++){
        arrayEvents[i].date = new Date(arrayEvents[i].date)
    }
}

function exportEvents(){
    localStorage.setItem('arrayEvents', JSON.stringify(arrayEvents))
}




