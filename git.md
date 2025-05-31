# 🚀 מדריך זריז: Git, GitHub ופרסום האתר שלכם!

היי חברים! במדריך הזה נלמד איך לקחת את פרויקט התערוכה הדיגיטלית שלנו, לעבוד עליו עם Git ו-GitHub, ואפילו לגרום לו "לחיות" באינטרנט כדי שכל העולם יוכל לראות!

## חלק 1: עבודה על הפרויקט עם Git ו-GitHub

Git היא מערכת שעוזרת לנו לעקוב אחרי שינויים בקוד (כמו מכונת זמן לקוד!), ו-GitHub הוא אתר שמאפשר לנו לאחסן את הקוד שלנו בענן ולשתף אותו.

### שלב 1: 🐑 שכפול (Clone) של הפרויקט למחשב שלכם

"שכפול" זה כמו להוריד עותק של כל תיקיית הפרויקט מה-GitHub למחשב שלכם, כדי שתוכלו לעבוד עליה.

1.  **מצאו את הכתובת:** לכו לדף הפרויקט ב-GitHub. חפשו כפתור ירוק שכתוב עליו `Code`. לחצו עליו, ותחת הלשונית `HTTPS`, תראו כתובת (URL). העתיקו אותה!

2.  **פתחו טרמינל (Terminal / Command Prompt / Git Bash):**
    * בווינדוס: חפשו "Git Bash" או "Command Prompt".
    * במק/לינוקס: חפשו "Terminal".

3.  **נווטו לתיקייה שבה תרצו לשמור את הפרויקט:** השתמשו בפקודה `cd` (change directory). למשל: `cd Documents/MyProjects`

4.  **הקלידו את פקודת השכפול:**
    ```bash
    git clone https://github.com/afikf/digital-exhibition.git
    ```

    לחצו Enter. זהו! תיקייה חדשה עם כל קבצי הפרויקט תיווצר אצלכם במחשב.

### שלב 2: 💻 עבודה על הקוד

1.  פתחו את התיקייה של הפרויקט בעורך הקוד האהוב עליכם (למשל, VS Code).
2.  בצעו את השינויים וההשלמות בקבצים (`index.html`, `script.js`, `style.css`) לפי ההוראות שקיבלתם.
3.  **שמרו את הקבצים** אחרי כל שינוי משמעותי! (Ctrl+S / Cmd+S).

### שלב 3: 💾 שמירת השינויים שלכם (Commit)

"קומיט" זה כמו לשמור "תמונת מצב" של השינויים שעשיתם בקוד. כל קומיט צריך הודעה שמסבירה מה שיניתם.

1.  **בטרמינל, נווטו לתוך תיקיית הפרויקט ששכפלתם** (אם אתם לא שם כבר).
2.  **הוסיפו את הקבצים ששיניתם ל"אזור ההכנה" (Staging Area):**
    ```bash
    git add .
    ```
    (הנקודה `.` אומרת "כל הקבצים והתיקיות ששונו בתיקייה הנוכחית")
    *אפשר גם להוסיף קובץ ספציפי:* `git add script.js`

3.  **בצעו את ה"קומיט":**
    ```bash
    git commit -m "הודעה קצרה שמתארת מה עשיתם, למשל: השלמתי את פונקציית הקרוסלה"
    ```
    (שנו את ההודעה שבמרכאות!)

### שלב 4: ☁️ העלאת השינויים ל-GitHub (Push)

"פוש" זה כמו להעלות את ה"קומיטים" (השינויים השמורים) שלכם מהמחשב המקומי בחזרה למאגר המרכזי ב-GitHub.

1.  **בטרמינל (בתוך תיקיית הפרויקט):**
    ```bash
    git push
    ```
2.  ייתכן שתתבקשו להזין את שם המשתמש והסיסמה שלכם ל-GitHub.
3.  זהו! השינויים שלכם עכשיו ב-GitHub.

---

## חלק 2: 🌍 GitHub Pages - האתר שלכם "חי" ברשת!

GitHub Pages הוא שירות חינמי מדהים של GitHub שמאפשר לכם להפוך את קבצי האתר שלכם (HTML, CSS, JS) לאתר אינטרנט אמיתי שכל אחד יכול לגלוש אליו!

### 🤔 איך זה עובד (בפשטות)?

1.  אתם שומרים את קבצי האתר שלכם (`index.html` וכל השאר) במאגר ב-GitHub.
2.  בהגדרות המאגר, אתם אומרים ל-GitHub Pages מאיזה ענף (branch) לקחת את הקבצים (בדרך כלל הענף הראשי שנקרא `main`).
3.  GitHub Pages מחפש אוטומטית קובץ בשם `index.html` בתיקייה הראשית של הענף הזה.
4.  הוא "מארח" את הקבצים האלה ומספק לכם כתובת אינטרנט ייחודית שבה האתר שלכם יהיה זמין. הכתובת נראית בדרך כלל כך: `https://<שםהמשתמששלכם>.github.io/<שםהמאגרשלכם>/`


### 🔄 איך מעדכנים את האתר החי?

זה החלק הכי קל! אחרי שהפעלתם את GitHub Pages:
**כל פעם שתעשו `git push` עם שינויים חדשים לקוד שלכם, האתר ב-GitHub Pages יתעדכן אוטומטית!**
(תנו לזה כמה דקות להתעדכן אחרי ה-push).

---

זהו! עכשיו אתם יודעים איך לעבוד על הפרויקט, לשמור גרסאות, לשתף ב-GitHub, ואפילו להפוך אותו לאתר חי.
**בהצלחה רבה בפרויקט!** 💪
