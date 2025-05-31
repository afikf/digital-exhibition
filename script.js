// script.js

// --- בחירת אלמנטים מה-DOM (Document Object Model) ---
const slides = document.querySelectorAll('.carousel-slide'); 
const carouselImages = document.querySelectorAll('.carousel-slide img'); 
const dotsContainer = document.querySelector('.carousel-dots'); 

const homePage = document.getElementById('home-page'); 
const galleryPage = document.getElementById('gallery-page'); 

const enterGalleryBtn = document.getElementById('enter-gallery-btn'); 
const backToHomeBtn = document.getElementById('back-to-home-btn'); 

const galleryGridContainer = document.getElementById('gallery-grid-container'); 

const modal = document.getElementById('imageModal'); 
const modalImg = document.getElementById('modalImage'); 
const modalCreator = document.getElementById('modalCreator'); 
const modalInstructions = document.getElementById('modalInstructions'); 
const closeModalBtn = document.getElementById('closeModalBtn'); 

// --- משתנים גלובליים ---
let currentSlide = 0; 
let slideInterval; 
let dots = []; 

// --- נתוני התמונות ---

// TODO: תלמידים - מלאו את המערך הזה עם פרטי היצירות שיוצגו בקרוסלה.
const carouselSlidesData = [
    // { src: "url", alt: "text", creator: "name", instructions: "text" },
];

// TODO: תלמידים - מלאו את המערך הזה עם פרטי היצירות שיוצגו בגלריה.
const galleryImagesData = [
    // { src: "url", alt: "text", creator: "name", instructions: "text" },
];

// --- פונקציות קרוסלה ---

/**
 * @function setupCarouselDots
 * @description יוצרת באופן דינמי את נקודות הניווט (dots) עבור הקרוסלה.
 */
function setupCarouselDots() {
    if (!dotsContainer) return; 
    dotsContainer.innerHTML = ''; 
    // TODO: תלמידים - יש ליצור נקודות ניווט, לקשר אותן לשקופיות ולהוסיפן ל-DOM.
    console.log("setupCarouselDots needs to be fully implemented by students");
}

/**
 * @function setupCarouselImageClicks
 * @description מוסיפה מאזיני לחיצה לתמונות עצמן בתוך הקרוסלה.
 */
function setupCarouselImageClicks() {
    // TODO: תלמידים - יש להוסיף מאזיני לחיצה לתמונות הקרוסלה שיפתחו את המודאל עם הנתונים המתאימים.
    console.log("setupCarouselImageClicks needs to be fully implemented by students");
}

/**
 * @function goToSlide
 * @description אחראית על החלפת השקופית המוצגת בקרוסלה.
 * @param {number} n - האינדקס של השקופית שאליה רוצים לעבור.
 */
function goToSlide(n) {
    if (slides.length === 0) return; 
    // TODO: תלמידים - יש להסתיר את השקופית הנוכחית ולהציג את השקופית החדשה (n), כולל עדכון נקודות הניווט.
    console.log("goToSlide needs to be fully implemented by students. Target slide index:", n);
}

/**
 * @function nextSlide
 * @description עוברת לשקופית הבאה בקרוסלה.
 */
function nextSlide() {
    // TODO: תלמידים - יש לקרוא ל-goToSlide עם האינדקס של השקופית הבאה.
    console.log("nextSlide needs to be implemented by students");
}

/**
 * @function resetInterval
 * @description מאפסת ומפעילה מחדש את הטיימר להחלפה אוטומטית של שקופיות בקרוסלה.
 */
function resetInterval() {
    clearInterval(slideInterval); 
    // TODO: תלמידים - יש להפעיל מחדש את setInterval להחלפת שקופיות אוטומטית (אם יש יותר משקופית אחת).
    console.log("resetInterval needs to be implemented by students");
}

// --- פונקציות ניווט וגלריה ---

/**
 * @function populateGallery
 * @description יוצרת באופן דינמי את פריטי התמונה בגלריה על סמך הנתונים במערך galleryImagesData.
 */
function populateGallery() {
    if (!galleryGridContainer) return; 
    galleryGridContainer.innerHTML = ''; 
    // TODO: תלמידים - יש ליצור את אלמנטי התמונה של הגלריה מהנתונים ולהוסיפם ל-DOM, כולל מאזין לחיצה לפתיחת המודאל.
    console.log("populateGallery needs to be fully implemented by students");
}

// מאזין לאירוע לחיצה על כפתור "כניסה לגלריה"
if (enterGalleryBtn) {
    enterGalleryBtn.addEventListener('click', () => {
        // TODO: תלמידים - יש להסתיר את דף הבית, להציג את דף הגלריה ולקרוא ל-populateGallery.
        console.log("Enter gallery button event listener needs to be fully implemented by students");
    });
}

// מאזין לאירוע לחיצה על כפתור "חזרה לדף הבית"
if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
        // TODO: תלמידים - יש להסתיר את דף הגלריה, להציג את דף הבית ולהפעיל מחדש את הקרוסלה.
        console.log("Back to home button event listener needs to be fully implemented by students");
    });
}

// --- פונקציות Modal ---

/**
 * @function openModal
 * @description פותחת את המודאל (חלון קופץ) ומציגה בו את פרטי התמונה שנבחרה.
 * @param {object} imageData - אובייקט המכיל את פרטי התמונה (src, alt, creator, instructions).
 */
function openModal(imageData) {
    if (!modal || !modalImg || !modalCreator || !modalInstructions) return; 
    // TODO: תלמידים - יש להציג את המודאל ולמלא אותו בפרטי התמונה מ-imageData.
    console.log("openModal needs to be fully implemented by students. Image data:", imageData ? imageData.alt : "No data");
}

// מאזין לאירוע לחיצה על כפתור הסגירה של המודאל (ה-X)
if (closeModalBtn) {
    closeModalBtn.onclick = function() {
        // TODO: תלמידים - יש להסתיר את המודאל.
        console.log("Close modal button event listener needs to be fully implemented by students");
    }
}

// מאזין ללחיצה על החלון כולו, כדי לאפשר סגירת המודאל על ידי לחיצה מחוץ לתוכן שלו
window.onclick = function(event) {
    if (event.target == modal) { 
        // TODO: תלמידים - יש להסתיר את המודאל אם הלחיצה היא על הרקע שלו.
        console.log("Window click event listener (for modal background click) needs to be fully implemented by students");
    }
}

// --- אתחול ---
// TODO: תלמידים - יש להוסיף כאן את הקריאות לפונקציות האתחול של הקרוסלה (לאחר בדיקה שהאלמנטים קיימים).
if (slides.length > 0) {
    console.log("Initialization logic needs to be added by students.");
} else {
    console.log("No slides found for carousel initialization.");
}

console.log("JavaScript skeleton (script.js) loaded. Student TODO sections are now very challenging.");
