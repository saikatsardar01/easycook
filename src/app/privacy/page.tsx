export default function Privacy() {
  return (
    <>
      
      <main className="min-h-screen bg-paper font-sans pb-24">
        
        {/* Header */}
        <div className="bg-stone-900 text-stone-300 py-16 px-6 mb-12 border-b border-stone-800">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
              Privacy Policy & Terms
            </h1>
            <p className="text-lg opacity-80">
              Last Updated: December 2025
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-stone-200 prose prose-stone prose-lg max-w-none">
            
            {/* 1. Introduction */}
            <section className="mb-12">
              <h2 className="font-display font-bold text-3xl text-stone-800 mb-6">1. Introduction</h2>
              <p>
                Welcome to <strong>EasyCook.in</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency regarding the information we handle. 
                By accessing or using our website, you agree to the terms outlined in this policy.
              </p>
            </section>

            {/* 2. Nature of Content (The Copyright Clause) */}
            <section className="mb-12 p-6 bg-stone-50 rounded-2xl border-l-4 border-stone-400">
              <h2 className="font-display font-bold text-2xl text-stone-800 mb-4 mt-0">2. Intellectual Property & Nature of Culinary Content</h2>
              <p>
                EasyCook operates as an aggregation and discovery platform for culinary information. It is important to clarify the legal standing of the content hosted on our platform:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Functional Instructions:</strong> Under standard international copyright laws, a mere listing of ingredients or a functional set of instructions (a recipe) is generally not subject to copyright protection. Culinary processes are considered utilitarian logic rather than creative literary expression.
                </li>
                <li>
                  <strong>Public Domain:</strong> The recipes featured on EasyCook are curated from public domain sources, community submissions, and common culinary knowledge passed down through generations.
                </li>
                <li>
                  <strong>Non-Infringement:</strong> We explicitly declare that we do not claim ownership of any individual's personal intellectual property. The publication of a dish's preparation method does not constitute an infringement of personal assets. 
                </li>
              </ul>
            </section>

            {/* 3. Financial Policy (The Scam Warning) */}
            <section className="mb-12 p-6 bg-emerald-50 rounded-2xl border-l-4 border-emerald-500">
              <h2 className="font-display font-bold text-2xl text-stone-800 mb-4 mt-0">3. Zero-Cost Policy & Fraud Warning</h2>
              <p className="font-bold text-emerald-800">
                EasyCook.in is and will always be a free-to-use public service.
              </p>
              <p>
                We strictly adhere to a non-monetary operational model regarding user interactions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>No Fees for Submission:</strong> We never charge users to submit, feature, or list their recipes on our platform.</li>
                <li><strong>No Subscription Fees:</strong> Access to our database is completely free.</li>
                <li><strong>Scam Alert:</strong> If you receive any communication (email, WhatsApp, or phone call) purporting to be from EasyCook asking for money, banking details, or UPI transfers for "Recipe Verification" or "Premium Listing," please <strong>IGNORE</strong> these requests immediately. They are fraudulent and not authorized by us.</li>
              </ul>
            </section>

            {/* 4. Data Collection */}
            <section className="mb-12">
              <h2 className="font-display font-bold text-2xl text-stone-800 mb-4">4. Data Collection & Cookies</h2>
              <p>
                We prioritize user anonymity. Our data collection practices are minimal:
              </p>
              <ul>
                <li><strong>Personal Data:</strong> We do not require account creation to browse recipes. We do not collect your name, email, or phone number unless you voluntarily provide it via our "Contact" or "Submit Recipe" forms.</li>
                <li><strong>Cookies:</strong> We use strictly necessary cookies to maintain site functionality, such as:
                  <ul className="list-disc pl-5 mt-2">
                    <li><em>Language Preferences:</em> To remember your selected regional language (via Google Translate).</li>
                    <li><em>Analytics:</em> Anonymous usage data to help us understand which recipes are popular.</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* 5. Right to Modify */}
            <section className="mb-12">
              <h2 className="font-display font-bold text-2xl text-stone-800 mb-4">5. Modifications to Services</h2>
              <p>
                We reserve the right, at our sole discretion, to modify, suspend, or discontinue any part of the Service at any time. We may update the website structure, remove recipes, or alter features without prior notice to users. We are not liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
              </p>
            </section>

            {/* 6. Contact */}
            <section className="mb-8">
              <h2 className="font-display font-bold text-2xl text-stone-800 mb-4">6. Contact Information</h2>
              <p>
                For questions regarding this policy or to report technical issues, please contact us at:
              </p>
              <p className="font-bold text-stone-800">support@easycook.in</p>
            </section>

          </div>
           
        </div>
      </main>
    </>
  );
}