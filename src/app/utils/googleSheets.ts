/**
 * Google Sheets Integration
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this Google Apps Script code:
 *
 * ```javascript
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *
 *     sheet.appendRow([
 *       new Date(),
 *       data.email,
 *       data.hairType,
 *       data.needs,
 *       data.answers
 *     ]);
 *
 *     return ContentService.createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * ```
 *
 * 4. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Copy the Web App URL
 *
 * 5. Add the URL to your .env file:
 *    VITE_GOOGLE_SHEETS_URL=your_web_app_url_here
 *
 * 6. Create a Google Sheet with these columns:
 *    Timestamp | Email | Hair Type | Needs | Answers
 */

export interface QuizData {
  email: string;
  hairType: string;
  needs: string;
  answers: string;
  timestamp: string;
}

export async function saveToGoogleSheets(data: QuizData): Promise<boolean> {
  // Get the Google Sheets Web App URL from environment variables
  const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (!googleSheetsUrl) {
    console.warn('Google Sheets URL not configured. Data not saved:', data);
    console.warn('Set VITE_GOOGLE_SHEETS_URL in your environment variables');
    // Still return true in development to allow testing
    return true;
  }

  try {
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // With no-cors, we can't read the response, so we assume success if no error thrown
    console.log('Data sent to Google Sheets:', data);
    return true;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    // Save to localStorage as backup
    saveToLocalStorage(data);
    return false;
  }
}

function saveToLocalStorage(data: QuizData) {
  try {
    const existingData = localStorage.getItem('perlapli_quiz_submissions');
    const submissions = existingData ? JSON.parse(existingData) : [];
    submissions.push(data);
    localStorage.setItem('perlapli_quiz_submissions', JSON.stringify(submissions));
    console.log('Data saved to localStorage as backup');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Utility to view all locally stored submissions (for debugging)
export function getLocalSubmissions(): QuizData[] {
  try {
    const data = localStorage.getItem('perlapli_quiz_submissions');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Utility to clear local submissions
export function clearLocalSubmissions() {
  localStorage.removeItem('perlapli_quiz_submissions');
}
