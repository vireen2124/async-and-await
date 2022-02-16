let content={};
const button =document.querySelectorAll(".button");
const container=document.querySelector(".starwars-container");
const pageButtons=document.querySelectorAll(".page-selectors");
const loadingContainer=document.querySelector(".loading-container")
let currentStarwars=0
const fetchData=async function(url){
    try{
        const data=await fetch(url)
        const receivedData=await data.json();
        content={...receivedData}
        renderDom(content,currentStarwars);
    }catch(err){
        alert("something went wrong"+errd)
    }

    
     
}
fetchData("https://swapi.py4e.com/api/people/")
const renderDom=(array,index)=>{
    loadingContainer.classList.add("hide-loading")
    container.innerHTML=""
    container.innerHTML +=`
    <div class="button back" id="back">
                <ion-icon name="caret-back-outline" onclick="manipulateContent('-')"></ion-icon>
            </div>
            <fieldset>
                <legend>
                    hero
                </legend>
                <div>
                    <span>Name:</span>
                
                    <span class="starwars-data" >${array.results[index].name}</span>   
                </div>
                <div>
                    <span>height:</span>
                    <span class="starwars-data">${array.results[index].height}</span>
                </div>
                <div>
                    <span>mass:</span>
                    <span class="starwars-data">${array.results[index].mass}</span>

                </div>
                <div>
                    <span>hair colour:</span>
                    <span class="starwars-data">${array.results[index].hair_color}</span>

                </div>
                <div>
                    <span>eye colour:</span>
                    <span class="starwars-data">${array.results[index].eye_color}</span>

                </div>
                <div>
                    <span>skin colour:</span>
                    <span class="starwars-data">${array.results[index].skin_color}</span>

                </div>
                <div>
                    <span>date of birth:</span>
                    <span class="starwars-data">${array.results[index].birth_year}</span>

                </div>
                <div>
                    <span>gender:</span>
                    <span class="starwars-data">${array.results[index].gender}</span>

                </div>
                <div>
                    <span>home world:</span>
                    <span class="starwars-data">${array.results[index].skin_colour}</span>

                </div>
                <div>
                    <span>species:</span>
                    <span class="starwars-data">${array.results[index].skin_colour}</span>

                </div>
                <div>
                    <span>vehicles:</span>
                    <span class="starwars-data">${array.results[index].skin_colour}</span>

                </div>
                
                <div>
                    <span>starships:</span>
                    <span class="starwars-data">${array.results[index].skin_colour}</span>

                </div>
                
                <div>
                    <span>date created:</span>
                    <span class="starwars-data">${array.results[index].created}</span>

                </div>  
            </fieldset>
            <div class="button front" id="front">
                <ion-icon name="caret-forward-outline"  onclick="manipulateContent('+')"></ion-icon>
            </div> 
 `
    
}
function manipulateContent(operator){
    switch(operator){
        case "+":
            if(currentStarwars===content.results.length-1){
                currentStarwars=content.results.length-1;
                pageButtons[1].classList.add("visible");
                
                
                break;
            }
            currentStarwars++;
            pageButtons[0].classList.remove("visible")
            break
        case "-":
            if(currentStarwars===0){
                currentStarwars=0;
                pageButtons[0].classList.add("visible")    
                break;
            }
            currentStarwars--; 
            pageButtons[1].classList.remove("visible")           
            break
    }
    renderDom(content,currentStarwars)
}
const timer=()=>{
    setTimeout(()=>{
        console.log("haha");
    },10000)
}
async function changePage(val){
    try{
        loadingContainer.classList.remove("hide-loading");
        const  next= await fetch(content[val]) 
        const converted=await next.json();
        content={};
        currentStarwars=0;
        content={...converted}
        renderDom(content,currentStarwars)
    }catch(err){
        alert("something went wrong" + err)
    }

}
pageButtons.forEach(button=>{
    button.addEventListener("click",(e)=>{
        const val=e.target.id.trim().toLowerCase();
        if(content[val]===null){
            alert("no more pages");
            button.classList.remove("visible")
        }else{
            switch(val){
                case "next":
                    changePage(val);
                    button.classList.remove("visible")
                    break;
                case "previous":
                        changePage(val);
                        button.classList.remove("visible")

                        
                        break;        
            }
        }
    })
})