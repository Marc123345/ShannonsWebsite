import { useState } from 'react';
import { Accessibility } from 'lucide-react';

export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-accent rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
        aria-label="הצהרת נגישות - Accessibility Statement"
        title="הצהרת נגישות - Accessibility Statement"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 id="accessibility-title" className="text-2xl font-bold text-secondary-900">
                  הצהרת נגישות | Accessibility Statement
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-secondary-600 hover:text-secondary-900 transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 text-secondary-800 leading-relaxed">
                <section>
                  <h3 className="text-xl font-semibold mb-3 text-secondary-900">עברית</h3>
                  <p className="mb-3">
                    אנו ב-H2H מחויבים להנגשת האתר שלנו לכלל האוכלוסייה, כולל אנשים עם מוגבלויות.
                  </p>
                  <p className="mb-3">
                    האתר נבנה בהתאם לתקן הישראלי (ת"י 5568) ולהנחיות WCAG 2.1 ברמת AA, תוך התאמה לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998.
                  </p>
                  <p className="mb-3">
                    <strong>התאמות נגישות באתר:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>ניווט מלא באמצעות מקלדת (Full keyboard navigation)</li>
                    <li>תמיכה בקוראי מסך (Screen reader support)</li>
                    <li>ניגודיות צבעים מותאמת (Appropriate color contrast)</li>
                    <li>טקסט ברור וקריא (Clear and readable text)</li>
                    <li>תמונות עם תיאורי ALT (Images with ALT descriptions)</li>
                    <li>מבנה סמנטי נכון (Proper semantic structure)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 text-secondary-900">English</h3>
                  <p className="mb-3">
                    We at H2H are committed to making our website accessible to all people, including persons with disabilities.
                  </p>
                  <p className="mb-3">
                    This website has been built in accordance with Israeli Standard 5568 and WCAG 2.1 Level AA guidelines, in compliance with the Equal Rights for Persons with Disabilities Law, 1998.
                  </p>
                  <p className="mb-3">
                    <strong>Accessibility features on this site:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full keyboard navigation - Navigate the entire site using only keyboard</li>
                    <li>Screen reader support - Compatible with JAWS, NVDA, and VoiceOver</li>
                    <li>Appropriate color contrast - Text meets WCAG AA contrast ratios</li>
                    <li>Clear and readable text - Typography optimized for readability</li>
                    <li>Images with ALT descriptions - All images include descriptive text</li>
                    <li>Proper semantic structure - HTML5 semantic elements throughout</li>
                  </ul>
                </section>

                <section className="border-t pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary-900">
                    צור קשר | Contact Us
                  </h3>
                  <p className="mb-3">
                    אם נתקלתם בבעיית נגישות באתר, אנא צרו איתנו קשר ונעשה כמיטב יכולתנו לסייע.
                  </p>
                  <p className="mb-3">
                    If you encounter any accessibility issues on our site, please contact us and we will do our best to assist.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us | צור קשר
                  </a>
                </section>

                <section className="text-sm text-secondary-600">
                  <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
