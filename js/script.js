//SITECOUNT
const countEl = document.getElementById('visitor');

updateVisitCount();
function updateVisitCount(){
    fetch('https://api.countapi.xyz/update/fuckinggenius2/meeeee332/?amount=1')
    .then(res => res.json())
    .then(res => {
        countEl.innerHTML = res.value;
    });
}

//SCROLLED NAV
const navbar = document.querySelectorAll(".nav");
const nav = Array.from(navbar);

//change color of nav unit
//nav[0].style.backgroundColor = "black";
console.log(nav);
const sections = document.querySelectorAll(".section");
const sectionOne = document.querySelector(".section1");
const options ={
    root: null, //it is the viewport if default is null
    threshold: 0.9, //(0~1)how many percent does the target section need to get in the viewport in order to trigger
    rootMargin: '0px'//
};

//OBSERVE
let currentNavNumber = -1;
let isSrollingUp = false;

const observerEnter = new IntersectionObserver(
    function(entries,observerEnter){
        entries.forEach(entry => {
            //DETECT SCROLL UP OR DOWN
            if (entry.boundingClientRect.top < 0) {
                if (entry.isIntersecting) {
                  // entered viewport at the top edge, hence scroll direction is up
                  isSrollingUp = true;
                } else {
                  // left viewport at the top edge, hence scroll direction is down
                  isSrollingUp = false;
                }
            }
            //IF NOT INTERSECTING, DONT OBSERVE
            if(!entry.isIntersecting){
                    return;
            }
            //IF SCROLLDOWN CURRENT NAV NUMBER++ | VICE VERSA
            if(isSrollingUp == false && entry.isIntersecting){
                currentNavNumber++;
            }else{
                currentNavNumber--;
            }

            console.log(isSrollingUp);
            console.log(entry.target);
            console.log(currentNavNumber);
            console.log(nav);

            //CHANGE NAV COLOR
            nav.forEach(unit => {unit.style.background = "none"});
            nav[currentNavNumber].style.background = "rgba(255, 208, 118, 0.5)";
            
            //entry.target.classList.toggle("scrolled")
            //entry.target.classList.toggle("scrolled");
            //observer.unobserve(entry.target); //optional
        });
}, options);

sections.forEach(section => {
    observerEnter.observe(section);
});

//RANDOM GENERATOR
let generateBtn = document.getElementsByClassName('random-btn'); 
let wordResult = document.getElementsByClassName('random-quote'); 
let randomWords = [
    "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????????????????",
    "?????????????????????????????????",
    "?????????????????????????????????????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????????????????????????????",
    "?????????????????????????????????????????????",
    "?????????????????????????????????????????????????????????????????????",
    "?????????????????????????????????????????????????????????????????????",
    "?????????????????????????????????????????????????????????",
    "???????????????????????????????????????????????????????????????????????????",
    "???????????????????????????????????????",
    "???????????????????????????????????????????????????",
    "???????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????????????????",
    "????????????????????????????????????????????????????????????????????????????????????????????????????????????",
    "???????????????????????????????????????????????????",
    "????????????????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????????????????",
    "?????????????????????????????????????????????",
    "???????????????????????????????????????",
    "???????????????????????????????????????????????????",
    "?????????????????????????????????????????????????????????",
    "???????????????????????????????????????????????????",
    "???????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????????????????????????????",
    "???????????????????????????????????????????????????????????????????????????????????????",
    "????????????????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????????????????",
    "??????????????????????????????????????????????????????",
];

function getRandomNumber(min,max){
    let step1 = max - min +1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

generateBtn[0].addEventListener('click', ()=>{
    let index = getRandomNumber(0, randomWords.length-1);
    wordResult[0].innerText = randomWords[index];
});

//CAROUSEL
const timeTrack = document.getElementById("timeline__container");
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".btn-right");
const prevButton = document.querySelector(".btn-left");
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);
const timeUnits = document.querySelector(".time-line");
const unit = Array.from(timeUnits.children);
const slideWidth = slides[1].getBoundingClientRect().width;
const color = Array = ["rgba(255, 208, 118, 0.5)", "rgba(92, 255, 206, 0.5)", "rgba(96, 131, 255, 0.5)", "rgba(255, 126, 126, 0.5)"];

//CHANGE CARD TAG COLOR
const cardTagAll = document.querySelectorAll(".tag-btm-r");
    //turn node list into array
var cardTag = [];
for(var i = cardTagAll.length; i--; cardTag.unshift(cardTagAll[i]));
const changeTagColor = (cardTagMember, index)=>{
    cardTagMember.style.borderBottom = "40px solid " + color[index%4];
}
cardTag.forEach(changeTagColor);


//arrange slides next to one another
//slides[0].style.left = slideWidth*0 + "px";
//slides[1].style.left = slideWidth*1 + "px";
//slides[2].style.left = slideWidth*2 + "px";
const setSlidePosition = (bitch, index)=>{
    bitch.style.left = slideWidth *1.1 * index + "px";
}
slides.forEach(setSlidePosition);


//move the slide
const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

//update dots
const updateDots =(currentDot, targetDot)=>{
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}


//update timeline unit
const updateUnit =(currentUnit, targetUnit)=>{
    const unitNumber = unit.findIndex(uni => uni === targetUnit);
    currentUnit.style.backgroundColor = 'white';
    targetUnit.style.backgroundColor = color[unitNumber%4];
    currentUnit.classList.remove('current-unit');
    targetUnit.classList.add('current-unit');
}



const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex ===0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//TIMELINE SCROLL
let currentIndex = 0;
let currentScrollPosition = 0;
let scrollAmount = 100;
const timelineContainer = document.getElementById("timeline__container");
const timeline = document.getElementById("timeline");
//how many unit can vw contain?
let vwContainUnit = Math.floor((timelineContainer.offsetWidth)/scrollAmount);
let a;
let maxScroll = -timelineContainer.offsetWidth + timeline.offsetWidth;

function scrollTimeline(){
    a = currentIndex/vwContainUnit
    if(currentIndex < vwContainUnit){
        currentScrollPosition = 0;
    }
    if(currentIndex >= vwContainUnit){
        if(a < 1){
            currentScrollPosition = (vwContainUnit*scrollAmount) + 1;
        }
        else{
            currentScrollPosition = (Math.floor(a))*(vwContainUnit*scrollAmount) + 1;
        }
        
    }
    timeline.style.right = currentScrollPosition + "px";
    console.log(vwContainUnit);
    console.log(currentIndex);
    console.log(a);
}

//click left, img move left
prevButton.addEventListener("click", e =>{
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)
    const currentUnit = timeUnits.querySelector(".current-unit");
    const prevUnit = currentUnit.previousElementSibling;
    currentIndex --;
    scrollTimeline(currentIndex);
    updateUnit(currentUnit, prevUnit);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
    
})

//click right, img move right
nextButton.addEventListener("click", e =>{
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    const currentUnit = timeUnits.querySelector(".current-unit");
    const nextUnit = currentUnit.nextElementSibling;
    currentIndex ++;
    
    scrollTimeline(currentIndex);
    updateUnit(currentUnit, nextUnit);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
    
})

//click nav indicator, move to that slide
dotsNav.addEventListener("click", e =>{
    //what indicator was selected on?
    const targetDot = e.target.closest(".carousel-indicator");
    
    if(!targetDot) return;
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot===targetDot);
    const targetSlide = slides[targetIndex];
    const currentUnit = timeUnits.querySelector(".current-unit");
    const targetUnit = unit[targetIndex];
    updateUnit(currentUnit, targetUnit);
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

//RANDOM QUOTE PASTE FUNCTION
const copyBtn =document.querySelector('#random-btn');
function copyText(htmlElement){
    let elementText = htmlElement.innerText;
    let inputElement = document.createElement('input');
    inputElement.setAttribute('value', elementText);
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    inputElement.parentNode.removeChild(inputElement);
}

copyBtn.onclick = 
function(){
    copyText(document.querySelector('#random-text'));
    console.log("yes");
    copyBtn.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function(){
        copyBtn.classList.remove("active");
        },2500);
}

//RANDOM QUOTE PASTE UI FEEDBACK
 
