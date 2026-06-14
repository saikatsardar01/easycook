// import Navbar from '@/components/Navbar';

export default function SubmitRecipe() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-paper pb-20">
        
        {/* Header Section */}
        <div className="bg-emerald-800 text-white py-16 px-4 text-center rounded-b-[3rem] shadow-soft mb-12">
           <h1 className="font-display font-black text-4xl md:text-5xl mb-4">Share Your Secret Recipe 🤫</h1>
           <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
             Help us grow the largest collection of local dishes. Your recipe could be cooked by thousands of people!
           </p>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          
          {/* INSTRUCTIONS CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-soft border border-stone-200 mb-12">
            <h2 className="font-display font-bold text-2xl text-stone-800 mb-6 flex items-center gap-2">
              <span>📝</span> Submission Guidelines
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-stone-600">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="bg-emerald-100 text-emerald-700 font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">1</span>
                  <p><strong className="text-stone-800">Ingredients:</strong> List them clearly separated by commas. <br/><em className="text-sm text-stone-400">Ex: 2 Onions, 1 tsp Salt, 500g Chicken</em></p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-emerald-100 text-emerald-700 font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">2</span>
                  <p><strong className="text-stone-800">Diet Type:</strong> Please specify if it is Veg, Non-Veg, or Vegan accurately.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="bg-rose-100 text-rose-700 font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">3</span>
                  <p className="bg-rose-50 p-2 rounded-lg border border-rose-100">
                    <strong className="text-stone-800 block mb-1">⚠️ IMPORTANT: The Method</strong>
                    Please end each cooking step with a <strong>Full Stop (.)</strong>. Our system uses the full stop to split the steps into a beautiful list.
                    <br/>
                    <em className="text-sm text-rose-400 block mt-1">Ex: Fry onions. Add spices. Cook for 10 mins.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GOOGLE FORM EMBED */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden relative">
            {/* Loading Placeholder */}
            <div className="absolute inset-0 bg-stone-50 flex items-center justify-center z-0">
               <span className="animate-pulse text-stone-400 font-bold">Loading Form...</span>
            </div>
            
            {/* REPLACE THE 'src' BELOW WITH YOUR GOOGLE FORM EMBED LINK 
                To get link: Open Form > Send > <> (Embed HTML) > Copy the URL inside src="..."
            */}
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSd0pFOic2ekx9tBagMRHMyzB29guP1AcPJPlTInxVyq9JCiJA/viewform?embedded=true" 
              width="100%" 
              height="1800" 
              frameBorder="0" 
              className="relative z-10 w-full"
            >
              Loading…
            </iframe>
          </div>

        </div>
      </div>
    </>
  );
}