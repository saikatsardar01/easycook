export default function About() {
  return (
    <>
      <main className="min-h-screen bg-paper font-sans">
        
        {/* HERO SECTION */}
        <div className="bg-emerald-900 text-white py-24 px-6 rounded-b-[3rem] shadow-soft mb-16 relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="font-display font-black text-4xl md:text-6xl mb-6 tracking-tight leading-tight">
              Bringing India's Kitchens <br/> to Your Screen.
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-90">
              We are on a mission to democratize cooking. Whether you speak Hindi, Bengali, or Tamil—great food should have no language barrier.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-24">
          
          {/* THE MISSION */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-2 block">Our Vision</span>
                <h2 className="font-display font-bold text-3xl text-stone-800 mb-6">A Recipe for Every Indian Home.</h2>
                <div className="prose prose-lg text-stone-600 leading-loose">
                  <p>
                    India is a land of a thousand flavors. From the mustard fields of Bengal to the spice coasts of Kerala, every region tells a story through its food. 
                    However, finding authentic, simple recipes that match your specific lifestyle can be difficult.
                  </p>
                  <p>
                    <strong>EasyCook.in</strong> was born from a simple idea: To build the most accessible, inclusive, and intelligent cookbook for the modern Indian family. 
                    We don't just list recipes; we solve the daily dilemma of <em>"What should I cook today?"</em>
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-stone-100 relative">
                <div className="absolute -top-4 -right-4 text-6xl">🥘</div>
                <h3 className="font-display font-bold text-xl mb-4 text-stone-800">We Connect Cultures</h3>
                <p className="text-stone-500 mb-4">
                  We believe a Gujarati family should easily be able to cook a traditional Manipuri stew, and a student in Pune should master a Bihari Litti Chokha.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['🇮🇳 Pan-India', '🤝 Inclusive', '🏠 Homemade'].map(tag => (
                    <span key={tag} className="bg-stone-50 text-stone-600 px-3 py-1 rounded-full text-xs font-bold border border-stone-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CORE VALUES / FEATURES */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl text-stone-800">Why EasyCook is Different</h2>
              <p className="text-stone-500 mt-2">Thoughtfully designed for your lifestyle.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1: Language */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl mb-6">🗣️</div>
                <h3 className="font-bold text-lg text-stone-800 mb-3">Your Language, Your Food</h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  We are proud to be one of the few platforms that offer <strong>instant translation into Indian regional languages</strong>. 
                  Read recipes in Hindi, Marathi, Bengali, Tamil, Gujarati, and more.
                </p>
              </div>

              {/* Feature 2: Diet Specific */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mb-6">🥗</div>
                <h3 className="font-bold text-lg text-stone-800 mb-3">Health & Diet First</h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  Whether you are <strong>Diabetic</strong>, follow a <strong>Sattvic (No Onion/Garlic)</strong> diet, or need <strong>High Protein</strong> vegetarian options, our smart filters find the perfect match for your health needs.
                </p>
              </div>

              {/* Feature 3: Smart Planning */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                <div className="notranslate w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-6">👥</div>
                <h3 className="font-bold text-lg text-stone-800 mb-3">Cooking for Any Crowd</h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  Cooking for one? Or hosting a family dinner for 6? Filter recipes by <strong>Serving Size</strong> so you never waste food or cook too little. We respect your time and resources.
                </p>
              </div>
            </div>
          </section>

          {/* SIMPLICITY PLEDGE */}
          <section className="bg-stone-900 text-stone-300 rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display font-bold text-3xl text-white mb-6">Technology That Feels Like Home.</h2>
              <p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8 text-stone-400">
                We built EasyCook to be <strong>senior-friendly and lightweight</strong>. 
                No confusing menus, no heavy loading times - just a clean, simple interface that lets you focus on what matters: The joy of cooking.
              </p>
              <div className="inline-flex items-center gap-2 bg-stone-800 px-6 py-3 rounded-full border border-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-sm text-white">6,000+ Verified Recipes</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}