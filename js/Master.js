// Random Background Option
let backgroundoption = true;
// Control the Interval
let backgroundInterval;

// Check if there Random Background Option
let backgroundItem = localStorage.getItem("background_option");
if (backgroundItem !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundItem === "true") {
    backgroundoption = true;
    // Remove active class
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundoption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Check if there is local storage color
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // Check for active class
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.color === mainColors) {
      e.classList.add("active");
    }
  });
}

// Settings Box
let iconDiv = document.querySelector(".toggle-settings");
let icon = document.querySelector(".fa-gear");
iconDiv.addEventListener("click", () => {
  document.querySelector(".settings-Box").classList.toggle("open");
  icon.classList.toggle("fa-spin");
});

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch Random Background
const RandomBackEl = document.querySelectorAll(".random-backgrounds span");
RandomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundoption = true;
      window.localStorage.setItem("background_option", true);
      randomizeImage();
    } else {
      backgroundoption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});

// Change Background after 10s
let LandingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
LandingPage.style.backgroundImage = 'url("../imgs/02.jpg")';
function randomizeImage() {
  if (backgroundoption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      LandingPage.style.backgroundImage =
        'url("../imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}
randomizeImage();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
//images popUp
let imgs = document.querySelectorAll(".imges-box img");
imgs.forEach((photo) => {
  photo.addEventListener("click", () => {
    // Create Elements
    let overlay = document.createElement("div");
    let PopupBox = document.createElement("div");
    let close = document.createElement("span");
    let h3 = document.createElement("h3");
    let PopUpImage = document.createElement("img");
    PopUpImage.src = photo.src;
    // Create innerContent
    close.className = "close-button";
    close.textContent = "X";
    h3.textContent = photo.getAttribute("alt");
    // Create Classes
    overlay.className = "popup-overlay";
    PopupBox.className = "popup-box";
    // Append
    PopupBox.append(h3);
    document.body.append(overlay);
    document.body.append(PopupBox);
    PopupBox.append(PopUpImage);
    PopupBox.append(close);
    // close button
    close.onclick = function () {
      PopupBox.remove();
      overlay.remove();
    };
  });
});

// Select All Links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
// Handle Active Stats
function handleActive(e) {
  e.target.parentElement
    .querySelectorAll(".active")
    .forEach((e) => e.classList.remove("active"));
  e.target.classList.add("active");
}
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
  bulletsContainer.style.display = bulletLocalItem;
}


bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.background === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", 'block');
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", 'none');
    }
    handleActive(e);
  });
});
// Reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
}
let toggleButton = document.querySelector(".toggle");
let Links = document.querySelector(".links");
toggleButton.onclick = function (e) {
  this.classList.toggle("active");
  Links.classList.toggle("open");
  e.stopPropagation();
}
// click anywhere outside menu and toggle
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== Links) {
    if (Links.classList.contains("open") && toggleButton.classList.contains("active") ) {
      Links.classList.remove("open");
      toggleButton.classList.remove("active");
    }
}
})
Links.onclick = function (e) {
  e.stopPropagation();
}