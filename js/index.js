// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    // console.log("local storage is not empty you can set it in root now");
    document.documentElement.style.setProperty("--main-color",mainColors);
    
    // remove active class from all list items 
    document.querySelectorAll(".color-list li").forEach(element => {

        element.classList.remove("active");

        // add active class on element with data-color === local storage item
        if (element.dataset.color === mainColors) {
            // add active class
            element.classList.add("active");
        }
    });

}
// random background option
let backgroundOption = true;

// variable to control background interval
let backgroundInterval;

// toggle spin on icon
document.querySelector(".toggle .gear").onclick = function () {
    // toggle fa-spin rotation
    this.classList.toggle("fa-spin");
    
    //toggle class opened on setting box
    document.querySelector(".setting-box").classList.toggle("opened"); 
};

// switch colors
let colorsLi = document.querySelectorAll(".color-list li"); // all lis

//loop on all li items
colorsLi.forEach(li => {

    // get data-color property by click on every li item
    li.addEventListener("click", (e) => {

        // set color property on root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);

        // set color on local storage
        localStorage.setItem("color_option",e.target.dataset.color);

        HandleActiveClass(e);
    });
});

// switch random background option
let randomBackEl = document.querySelectorAll(".random-backgrounds span"); // all spans

//loop on all span items
randomBackEl.forEach(span => {

    // get data-color property by click on every li item
    span.addEventListener("click", (e) => {

        HandleActiveClass(e)

        if (e.target.dataset.background === "yes") {

            backgroundOption = true;
            randomizeImages();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
        // remove 

    });
});

/* Randomly Change Background With JavaScript */
//select landing page element
let landingpage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];

// function to randomize image 
function randomizeImages () {
        if (backgroundOption === true) {
            // generate random number every 1s
            backgroundInterval = setInterval(() => {
            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // change background image url
            landingpage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';
            
            },3000)
        }
    }
randomizeImages();

//select skills selector 
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    // skills ofset top
    let skillsOfsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsouterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scroll top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOfsetTop + skillsouterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click",(e)=>{
        // create overLay element
        let overLay = document.createElement("div");

        // add class to overlay
        overLay.className = "popup-overlay";

        // append overlay to body
        document.body.appendChild(overLay);

        // create the popup
        let popupBox = document.createElement("div");

        if( img.alt !== null) {

            // create heading 
            let imgHeading = document.createElement("h3");

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append heading to popup box
            popupBox.appendChild(imgHeading);
        }

        // add class to popup box 
        popupBox.className = "popup-box";

        // create the img 
        let popupImag = document.createElement("img");

        // set image src
        popupImag.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImag);

        // add popup box to body
        document.body.appendChild(popupBox);

        // create close span
        let closeSpan = document.createElement("span");

        // create the close span text
        let closeSpanText = document.createTextNode("X");

        // APPEND TEXT TO CLOSE SPAN
        closeSpan.appendChild(closeSpanText);

        // add class name to close span
        closeSpan.className = 'close-span';

        // append close span to popup box
        popupBox.appendChild(closeSpan);
    });
});

// close popup
document.addEventListener("click",function (e) {

    if (e.target.className == "close-span") {

        // remove the current popup
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollIntoView (element) {

    element.forEach(ele => {

        ele.addEventListener("click",(e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                
                behavior:'smooth'
            });

        });
    });
}

scrollIntoView(allLinks);
scrollIntoView(allBullets);

// Handle Active Class
function HandleActiveClass(ev) {

    // remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    // add active class
    ev.target.classList.add("active");
}

// show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItems = localStorage.getItem("bullets_option");

// display bullets and add class active
if (bulletLocalItems !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletLocalItems === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click",(e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option","block");

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option","none");
        }

        HandleActiveClass(e);
    });

});

// reset button

document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("color_option");
    // localStorage.removeItem("background-option");
    localStorage.removeItem("bullets_option");

    // reload page
    window.location.reload();
}

// toggle menu

let btnToggle = document.querySelector(".toggle-menu");

let liLinks = document.querySelector(".links");

btnToggle.onclick = function (e) {

    // stop propagation
    e.stopPropagation();

    // toggle class menu-active on toggle-bar
    this.classList.toggle("menu-active");

    // toggle class open on links-menu
    liLinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click",(e) => {

    if (e.target !== btnToggle && e.target !== liLinks) {

        // check if menu is open
        if (liLinks.classList.contains("open")) {

            // toggle class menu-active on toggle-bar
            btnToggle.classList.toggle("menu-active");

            // click anywhere outside menu and toggle button
            liLinks.classList.toggle("open");
        }
    }
});

// stop propagation on menu

liLinks.addEventListener("click", (e) => {
    e.stopPropagation();
});