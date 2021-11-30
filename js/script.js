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
            /*
            if(isSrollingUp == false && entry.isIntersecting){
                currentNavNumber++;
            }else{
                currentNavNumber--;
            }*/
            //CHANGE NAV COLOR
            const colorForNav = Array = ["rgba(255, 208, 118, 0.5)", "rgba(92, 255, 206, 0.5)", "rgba(96, 131, 255, 0.5)", "rgba(255, 126, 126, 0.5)"];
            nav.forEach(unit => {unit.style.background = "none"});
            const idArray = ["hero", "column", "timeline", "randomWord", "feedback"];
            for(i = 0; i < idArray.length; i++){
                if(entry.target.id == idArray[i]){
                    nav[i].style.background = colorForNav[i%4];
                }
            }
            
            /*
            if(entry.target.id == idArray[0]){
                nav[0].style.background = "rgba(255, 208, 118, 0.5)";
            }else if(entry.target.id == idArray[1]){
                nav[1].style.background = "rgba(255, 208, 118, 0.5)";
            }else if(entry.target.id == idArray[2]){
                nav[2].style.background = "rgba(255, 208, 118, 0.5)";
            }else if(entry.target.id == idArray[3]){
                nav[3].style.background = "rgba(255, 208, 118, 0.5)";
            }else if(entry.target.id == idArray[4]){
                nav[4].style.background = "rgba(255, 208, 118, 0.5)";
            }*/
            /*
            nav.forEach(unit => {unit.style.background = "none"});
            nav[currentNavNumber].style.background = "rgba(255, 208, 118, 0.5)";
            */
            console.log(isSrollingUp);
            console.log(entry.target.id);
            console.log(currentNavNumber);
            console.log(nav);
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
    "妳有極強的自尊心，這個就導致妳對其他人的無心話語很敏感，很容易就自己想東想西的。",
    "倔強、遇到討厭的人，寧可受罪也不向對方求助。",
    "率真坦白，討厭被欺騙。",
    "冷漠是隱藏屬性。對惹毛他和糾纏不休的人，表現異常明顯。",
    "不圓滑、不世故、不記仇，遇到事情常常猶豫，難以選擇。",
    "對繁瑣的事情沒耐心、容易放棄。",
    "心地善良、樂於助人，即使不喜歡的也會盡力完成。",
    "心軟、即使受傷，一旦對方道歉便忍不住說沒關係。",
    "陌生人面前很安靜很慢熟，熟了吵吵鬧鬧。",
    "有點小脾氣但很會隱忍，不輕易表露自己的性情和內心。",
    "吃軟不吃硬，經常口是心非。",
    "樂觀又悲觀，安全感不多，有點感性。",
    "朋友求助常有求必應，所以容易被騙。",
    "害怕受傷。對陌生人冷冷的，熟悉後就嘻嘻哈哈。",
    "故作堅強，其實很軟弱。被人誤解卻不願意多解釋，多愁善感，總為小事情糾結。",
    "喜歡裝堅強，裝冷酷，讓人捉摸不透。",
    "隱藏悲傷，卻希望別人安慰他，給他安全感。",
    "愛幻想，希望有人懂他、愛他、能給他所想要的。",
    "浪漫體貼，細心關愛自己愛的人。",
    "外表孩子氣，內心卻很成熟。",
    "害怕被忽略，對人關心也不表露出來。",
    "內心藏著無數秘密，只和最親蜜的人分享。",
    "替他人著想，試圖改變自己迎合對方。",
    "外表親切熱情，內心追求安逸的環境。",
    "對最親愛的人容易暴走脾氣，對外人和善、常被說人很好。",
    "愛睡覺，對多數人和事不上心，不在意周圍，太自我、忽冷忽熱。",
    "超懶散，對任何事情都抱著隨遇而安的態度。",
    "膽小害怕失敗，卻總表現出強悍的一面。",
    "珍惜友誼，成為他的死黨要很久，經歷很多事情。",
    "很會忍耐，什麼事都放在心裡自己承受。",
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
const timeline = document.getElementById("timeline-bar");
//how many unit can vw contain?
let vwContainUnit = Math.floor((timelineContainer.offsetWidth)/scrollAmount);
let a;
let maxScroll = -timelineContainer.offsetWidth + timeline.offsetWidth;

function scrollTimeline(){
    a = currentIndex/vwContainUnit;
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
 
