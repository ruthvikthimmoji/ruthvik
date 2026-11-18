# See who downloaded your résumé (and every other form) in a Google Sheet

Each form on the portfolio does two things:

1. **Emails you** through Resend (`RESEND_API_KEY`, `GUESTBOOK_TO`).
2. **Adds a row to your Google Sheet**, with one tab per form: *Resume downloads*, *Project briefs*, *Guestbook* and *Shop waitlist*.

Either one is enough for the form to work. With both set up, you get an email for each submission and the sheet keeps the full history. It takes about 5 minutes.

## 1. Create the sheet

1. Go to sheets.new and name the file **Portfolio leads**.
2. Open **Extensions → Apps Script**.
3. Delete what's in the editor and paste the script below.
4. Change `SECRET` to any long random string, for example `rt-9f3k2-portfolio-x81`.

```js
const SECRET = "change-me-to-a-long-random-string";

const COLUMNS = {
  "Resume downloads": ["when", "name", "company", "role", "contact"],
  "Project briefs": ["when", "name", "email", "company", "types", "budget", "timeline", "message"],
  "Guestbook": ["when", "name", "role", "contact", "message"],
  "Shop waitlist": ["when", "email", "interests"],
};

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  if (data.secret !== SECRET) return ContentService.createTextOutput("no");
  const cols = COLUMNS[data.type];
  if (!cols) return ContentService.createTextOutput("unknown type");

  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(data.type);
  if (!sheet) {
    sheet = book.insertSheet(data.type);
    sheet.appendRow(cols.map((c) => c.toUpperCase()));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, cols.length).setFontWeight("bold");
  }
  sheet.appendRow(cols.map((c) => data[c] || ""));
  return ContentService.createTextOutput("ok");
}
```

5. Click **Deploy → New deployment**. Choose the type **Web app**, set *Execute as* to **Me** and *Who has access* to **Anyone**, then click **Deploy**.
6. Allow the permissions it asks for. It's your own script.
7. Copy the **Web app URL**. It ends in `/exec`.

## 2. Add the env vars

Add these to `.env.local` and to **Vercel → Settings → Environment Variables**:

```
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
LEADS_SECRET=the same string you put in SECRET
```

Redeploy on Vercel. Submit each form once to test it; a tab appears in the sheet for each form.

**Tip:** in the Google Sheets app, turn on notifications under **Tools → Notification settings**. You'll get a phone alert when a recruiter downloads your résumé.

**If you edit the script later:** go to **Deploy → Manage deployments**, edit the deployment and choose **New version**. Otherwise the old code keeps running.
