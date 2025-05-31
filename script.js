// script.js

// --- בחירת אלמנטים מה-DOM (Document Object Model) ---
// כאן אנחנו "תופסים" את האלמנטים השונים מה-HTML שלנו באמצעות המזהים (id) או הקלאסים (class) שלהם,
// כדי שנוכל לשלוט בהם ולהגיב לאירועים שקשורים אליהם באמצעות JavaScript.

const slides = document.querySelectorAll('.carousel-slide'); // אוסף (NodeList) של כל האלמנטים עם הקלאס 'carousel-slide' (השקופיות בקרוסלה)
const carouselImages = document.querySelectorAll('.carousel-slide img'); // אוסף של כל תגי ה-img שנמצאים בתוך שקופיות הקרוסלה
const dotsContainer = document.querySelector('.carousel-dots'); // האלמנט שמכיל את נקודות הניווט של הקרוסלה

const homePage = document.getElementById('home-page'); // ה-div של עמוד הבית
const galleryPage = document.getElementById('gallery-page'); // ה-div של עמוד הגלריה

const enterGalleryBtn = document.getElementById('enter-gallery-btn'); // כפתור הכניסה לגלריה
const backToHomeBtn = document.getElementById('back-to-home-btn'); // כפתור החזרה לדף הבית מהגלריה

const galleryGridContainer = document.getElementById('gallery-grid-container'); // ה-div שיכיל את רשת התמונות בגלריה

// אלמנטים של ה-Modal (חלון קופץ)
const modal = document.getElementById('imageModal'); // ה-div הראשי של המודאל
const modalImg = document.getElementById('modalImage'); // תג ה-img בתוך המודאל, להצגת התמונה המוגדלת
const modalCreator = document.getElementById('modalCreator'); // הפסקה שתציג את שם יוצר התמונה במודאל
const modalInstructions = document.getElementById('modalInstructions'); // הפסקה שתציג את הנחיות היצירה במודאל
const closeModalBtn = document.getElementById('closeModalBtn'); // כפתור הסגירה של המודאל (ה-X)

// --- משתנים גלובליים ---
// משתנים אלו נגישים מכל מקום בקוד וישמשו אותנו לניהול מצב האפליקציה.

let currentSlide = 0; // האינדקס של השקופית הנוכחית המוצגת בקרוסלה (מתחיל מ-0)
let slideInterval; // משתנה שיחזיק את ה-ID של ה-setInterval, כדי שנוכל לעצור ולהפעיל מחדש את החלפת השקופיות האוטומטית
let dots = []; // מערך שיחזיק את אלמנטי ה-DOM של נקודות הניווט בקרוסלה, לאחר שניצור אותן

// --- נתוני התמונות ---
// מערכים אלו יכילו אובייקטים, כאשר כל אובייקט מייצג תמונה ויש לו מאפיינים כמו מקור (src), טקסט אלטרנטיבי (alt), שם היוצר (creator) והנחיות (instructions).

// TODO: תלמידים - מלאו את המערך הזה עם פרטי היצירות שיוצגו בקרוסלה.
// ודאו שמספר הפריטים כאן תואם למספר ה-carousel-slide ב-HTML, ושה-data-index ב-HTML תואם לאינדקס כאן.
const carouselSlidesData = [
    { 
        src: "https://placehold.co/800x500/6366F1/FFFFFF?text=יצירה+קרוסלה+1", 
        alt: "יצירה לדוגמה 1 בקרוסלה", 
        creator: "יוצר קרוסלה 1", 
        instructions: "הנחיות ליצירה 1 בקרוסלה." 
    },
    { 
        src: "https://placehold.co/800x500/EC4899/FFFFFF?text=יצירה+קרוסלה+2", 
        alt: "יצירה לדוגמה 2 בקרוסלה", 
        creator: "יוצר קרוסלה 2", 
        instructions: "הנחיות ליצירה 2 בקרוסלה." 
    },
    { 
        src: "https://placehold.co/800x500/10B981/FFFFFF?text=יצירה+קרוסלה+3", 
        alt: "יצירה לדוגמה 3 בקרוסלה", 
        creator: "יוצר קרוסלה 3", 
        instructions: "הנחיות ליצירה 3 בקרוסלה." 
    },
    { 
        src: "https://placehold.co/800x500/F59E0B/FFFFFF?text=יצירה+קרוסלה+4", 
        alt: "יצירה לדוגמה 4 בקרוסלה", 
        creator: "יוצר קרוסלה 4", 
        instructions: "הנחיות ליצירה 4 בקרוסלה." 
    },
    // הוסיפו עוד אובייקטים לפי מספר השקופיות בקרוסלה
];

// TODO: תלמידים - מלאו את המערך הזה עם פרטי היצירות שיוצגו בגלריה.
const galleryImagesData = [
    { 
        src: "https://placehold.co/600x400/A78BFA/FFFFFF?text=יצירת+גלריה+1", 
        alt: "יצירת גלריה 1", 
        creator: "יוצר גלריה 1", 
        instructions: "הנחיות ליצירת גלריה 1." 
    },
    { 
        src: "https://placehold.co/600x400/F472B6/FFFFFF?text=יצירת+גלריה+2", 
        alt: "יצירת גלריה 2", 
        creator: "יוצר גלריה 2", 
        instructions: "הנחיות ליצירת גלריה 2." 
    },
    // הוסיפו עוד אובייקטים לפי הצורך
];

// --- פונקציות קרוסלה ---

/**
 * @function setupCarouselDots
 * @description יוצרת באופן דינמי את נקודות הניווט (dots) עבור הקרוסלה.
 * כל נקודה מקושרת לשקופית המתאימה ומאפשרת מעבר אליה בלחיצה.
 */
function setupCarouselDots() {
    if (!dotsContainer) return; // אם מיכל הנקודות לא נמצא, אין טעם להמשיך
    dotsContainer.innerHTML = ''; // מנקה נקודות קיימות (אם יש)
    slides.forEach((slide, index) => { // עובר על כל שקופית בקרוסלה
        const dot = document.createElement('div'); // יוצר אלמנט div חדש עבור הנקודה
        dot.classList.add('carousel-dot'); // מוסיף לו את הקלאס לעיצוב
        if (index === 0) dot.classList.add('active'); // הנקודה הראשונה מקבלת קלאס 'active'
        dot.addEventListener('click', () => { // מוסיף מאזין ללחיצה על הנקודה
            goToSlide(index); // קורא לפונקציה שמציגה את השקופית המתאימה
            resetInterval(); // מאפס את הטיימר להחלפה אוטומטית של שקופיות
        });
        dotsContainer.appendChild(dot); // מוסיף את הנקודה למיכל הנקודות ב-HTML
    });
    dots = document.querySelectorAll('.carousel-dot'); // מאחסן את כל הנקודות שנוצרו במשתנה הגלובלי dots
    console.log("setupCarouselDots implemented");
}

/**
 * @function setupCarouselImageClicks
 * @description מוסיפה מאזיני לחיצה לתמונות עצמן בתוך הקרוסלה.
 * לחיצה על תמונה בקרוסלה תפתח את המודאל עם פרטי התמונה.
 */
function setupCarouselImageClicks() {
    slides.forEach((slideDiv) => { // עובר על כל div של שקופית
        const imgElement = slideDiv.querySelector('img'); // מוצא את תג ה-img בתוך השקופית
        if (imgElement) {
            // קורא את ה-data-index שהוגדר ב-HTML כדי לדעת לאיזה אובייקט נתונים לקשר את התמונה
            const dataIndex = parseInt(slideDiv.dataset.index); 
            if (!isNaN(dataIndex) && carouselSlidesData[dataIndex]) { // בודק שהאינדקס תקין ויש נתונים עבורו
                imgElement.addEventListener('click', () => { // מוסיף מאזין ללחיצה על התמונה
                    openModal(carouselSlidesData[dataIndex]); // פותח את המודאל עם הנתונים של התמונה הספציפית הזו
                });
            } else {
                console.warn(`Data for carousel slide with data-index ${dataIndex} not found or index is invalid. Check HTML data-index and carouselSlidesData array.`);
            }
        }
    });
    console.log("setupCarouselImageClicks implemented");
}

/**
 * @function goToSlide
 * @description אחראית על החלפת השקופית המוצגת בקרוסלה.
 * @param {number} n - האינדקס של השקופית שאליה רוצים לעבור.
 */
function goToSlide(n) {
    if (slides.length === 0) return; // אם אין שקופיות, אין מה לעשות
    slides[currentSlide].classList.remove('active'); // מסיר את הקלאס 'active' מהשקופית הנוכחית (מסתיר אותה)
    if(dots.length > 0 && dots[currentSlide]) dots[currentSlide].classList.remove('active'); // מסיר 'active' מהנקודה הנוכחית
    
    currentSlide = (n + slides.length) % slides.length; // מחשב את האינדקס החדש בצורה מעגלית (כדי שאם מגיעים לסוף, חוזרים להתחלה)
    
    slides[currentSlide].classList.add('active'); // מוסיף 'active' לשקופית החדשה (מציג אותה)
    if(dots.length > 0 && dots[currentSlide]) dots[currentSlide].classList.add('active'); // מוסיף 'active' לנקודה החדשה
    console.log("goToSlide implemented for slide:", n);
}

/**
 * @function nextSlide
 * @description עוברת לשקופית הבאה בקרוסלה.
 */
function nextSlide() {
    goToSlide(currentSlide + 1); // קורא ל-goToSlide עם האינדקס של השקופית הבאה
    console.log("nextSlide implemented");
}

/**
 * @function resetInterval
 * @description מאפסת ומפעילה מחדש את הטיימר להחלפה אוטומטית של שקופיות בקרוסלה.
 * זה שימושי אחרי אינטראקציה ידנית של המשתמש (כמו לחיצה על נקודת ניווט).
 */
function resetInterval() {
    clearInterval(slideInterval); // מנקה את האינטרוול הקיים (עוצר את ההחלפה האוטומטית)
    if (slides.length > 1) { // רק אם יש יותר משקופית אחת
        slideInterval = setInterval(nextSlide, 5000); // מפעיל מחדש את האינטרוול, שיקרא לפונקציה nextSlide כל 5 שניות
    }
    console.log("resetInterval implemented");
}

// --- פונקציות ניווט וגלריה ---

/**
 * @function populateGallery
 * @description יוצרת באופן דינמי את פריטי התמונה בגלריה על סמך הנתונים במערך galleryImagesData.
 */
function populateGallery() {
    if (!galleryGridContainer) return; // אם מיכל הגלריה לא קיים, אין טעם להמשיך
    galleryGridContainer.innerHTML = ''; // מנקה תמונות קיימות מהגלריה
    galleryImagesData.forEach(imgData => { // עובר על כל אובייקט נתונים של תמונה במערך
        const galleryItem = document.createElement('div'); // יוצר div חיצוני לכל פריט בגלריה
        galleryItem.classList.add('gallery-item'); // מוסיף לו קלאס לעיצוב

        const imgElement = document.createElement('img'); // יוצר תג img
        imgElement.src = imgData.src; // קובע את מקור התמונה
        imgElement.alt = imgData.alt; // קובע את הטקסט האלטרנטיבי
        imgElement.onerror = function() { this.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Error'; } // מה לעשות אם התמונה לא נטענת
        
        imgElement.addEventListener('click', () => openModal(imgData)); // מוסיף מאזין ללחיצה על התמונה, שיפתח את המודאל עם נתוני התמונה
        
        galleryItem.appendChild(imgElement); // מוסיף את התמונה ל-div החיצוני
        galleryGridContainer.appendChild(galleryItem); // מוסיף את כל הפריט למיכל הגלריה
    });
    console.log("populateGallery implemented");
}

// מאזין לאירוע לחיצה על כפתור "כניסה לגלריה"
if (enterGalleryBtn) {
    enterGalleryBtn.addEventListener('click', () => {
        if (homePage) homePage.classList.add('hidden'); // מסתיר את עמוד הבית
        if (galleryPage) {
            galleryPage.classList.remove('hidden'); // מציג את עמוד הגלריה
            galleryPage.scrollIntoView({ behavior: 'smooth' }); // גולל את התצוגה בצורה חלקה לראש עמוד הגלריה
        }
        populateGallery(); // קורא לפונקציה שממלאת את הגלריה בתמונות
        console.log("Enter gallery button clicked - navigation logic implemented");
    });
}

// מאזין לאירוע לחיצה על כפתור "חזרה לדף הבית"
if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
        if (galleryPage) galleryPage.classList.add('hidden'); // מסתיר את עמוד הגלריה
        if (homePage) {
            homePage.classList.remove('hidden'); // מציג את עמוד הבית
            homePage.scrollIntoView({ behavior: 'smooth' }); // גולל לראש עמוד הבית
        }
        resetInterval(); // מפעיל מחדש את החלפת השקופיות האוטומטית בקרוסלה
        console.log("Back to home button clicked - navigation logic implemented");
    });
}

// --- פונקציות Modal ---

/**
 * @function openModal
 * @description פותחת את המודאל (חלון קופץ) ומציגה בו את פרטי התמונה שנבחרה.
 * @param {object} imageData - אובייקט המכיל את פרטי התמונה (src, alt, creator, instructions).
 */
function openModal(imageData) {
    if (!modal || !modalImg || !modalCreator || !modalInstructions) return; // בדיקה שכל אלמנטי המודאל קיימים
    modal.style.display = "flex"; // מציג את המודאל (משנה את ה-CSS שלו מ-none ל-flex)
    modalImg.src = imageData.src; // קובע את מקור התמונה במודאל
    modalImg.alt = imageData.alt || "תמונה מוגדלת"; // קובע את הטקסט האלטרנטיבי, עם ערך ברירת מחדל
    modalCreator.textContent = imageData.creator || "לא ידוע"; // מציג את שם היוצר, עם ערך ברירת מחדל
    modalInstructions.textContent = imageData.instructions || "אין הנחיות מיוחדות"; // מציג את ההנחיות, עם ערך ברירת מחדל
    console.log("openModal implemented for image:", imageData.alt);
}

// מאזין לאירוע לחיצה על כפתור הסגירה של המודאל (ה-X)
if (closeModalBtn) {
    closeModalBtn.onclick = function() {
        if (modal) modal.style.display = "none"; // מסתיר את המודאל
        console.log("Close modal button clicked - logic implemented");
    }
}

// מאזין ללחיצה על החלון כולו, כדי לאפשר סגירת המודאל על ידי לחיצה מחוץ לתוכן שלו
window.onclick = function(event) {
    if (event.target == modal) { // אם האלמנט שנלחץ הוא הרקע של המודאל עצמו
        if (modal) modal.style.display = "none"; // מסתיר את המודאל
        console.log("Clicked outside modal content - logic implemented");
    }
}

// --- אתחול ---
// קוד זה ירוץ לאחר שכל ה-HTML נטען וה-DOM מוכן (בגלל התכונה 'defer' בתג ה-script ב-HTML).

// בדיקה אם יש שקופיות בקרוסלה לפני שמנסים לאתחל אותה
if (slides.length > 0) {
    if (dotsContainer) { // בדיקה נוספת שמיכל הנקודות קיים
        setupCarouselDots(); // יצירת נקודות הניווט
    }
    setupCarouselImageClicks(); // הוספת מאזיני לחיצה לתמונות הקרוסלה
    resetInterval(); // הפעלת החלפת השקופיות האוטומטית
} else {
    console.log("No slides found for carousel initialization.");
}

// טיפול בשגיאות טעינת תמונות בקרוסלה - כבר קיים ב-HTML עם onerror על תגי ה-img.
// טיפול בשגיאות טעינת תמונות בגלריה - מטופל בפונקציה populateGallery.

console.log("JavaScript skeleton (script.js) loaded. Student TODO sections might remain.");
