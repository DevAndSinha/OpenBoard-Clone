let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let optionsFlag = true;
let pencilToolsCont = document.querySelector(".pencil-tool-cont");
let eraserToolsCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
pencilFlag = false;
eraserFlag = false;


//true means show tools
optionsCont.addEventListener("click", (e) =>{
    optionsFlag = !optionsFlag;
    if(optionsFlag)
        openTools();
    else closeTools();
      
});
function openTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "flex";
}
function closeTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "none";
    pencilToolsCont.style.display = "none";
    eraserToolsCont.style.display = "none";


}
pencil.addEventListener("click",(e)=>{
    pencilFlag = !pencilFlag;
    if(pencilFlag){
        pencilToolsCont.style.display = "block";
    }else{
        pencilToolsCont.style.display = "none";
    }
})

eraser.addEventListener("click",(e)=>{
    eraserFlag = !eraserFlag;
    if(eraserFlag){
        eraserToolsCont.style.display = "flex";
    }else{
        eraserToolsCont.style.display = "none";
    }
})

upload.addEventListener("click", (e)=>{
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        
        let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = `
    <div class="header-cont">
        <div class="remove"></div>
        <div class="minimize"></div>
        
    </div>
    <div class="note-cont">
        <image src="${url}"/>
    `;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");

    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function(event) {

        dragAndDrop(stickyCont, event);
      
      };
      
      stickyCont.ondragstart = function() {
        return false;
      };
    
    })
    


})

sticky.addEventListener("click", (e) =>{
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = `
    <div class="header-cont">
        <div class="remove"></div>
        <div class="minimize"></div>
        
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    `;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");

    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function(event) {

        dragAndDrop(stickyCont, event);
      
      };
      
      stickyCont.ondragstart = function() {
        return false;
      };

    
}) 

function noteActions(minimize, remove, stickyCont){
    remove.addEventListener("click", (e)=>{
        stickyCont.remove();
    })

    minimize.addEventListener("click",(e)=>{
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if(display == "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })

}

function dragAndDrop(element, event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };

}
