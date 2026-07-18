import Link from "next/link";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <section className="relative py-20 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-purple/5 blur-[120px]" />
          <div className="absolute left-1/4 top-20 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-accent-pink/5 blur-[100px]" />
          <div className="absolute right-1/4 top-10 h-[300px] w-[400px] rounded-full bg-accent-blue/5 blur-[100px]" />
        </div>

        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-dark-700/50 border border-dark-600 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-blue animate-pulse" />
            <span className="text-sm font-medium text-dark-200">Pokemon Showdown Team Sharing</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Share your teams
            <br />
            <span className="gradient-text">beautifully.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-dark-200 leading-relaxed">
            Paste your Pokemon Showdown team export and get a stunning visual
            preview with sprites, stats, and a shareable link. The modern way to
            share competitive teams.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/new" className="btn-primary text-lg px-8 py-3.5">+ New Paste</Link>
            <Link href="/browse" className="btn-secondary text-lg px-8 py-3.5">Browse Teams</Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            }
            title="Visual Preview"
            description="See your team with animated sprites, EV bars, items, and abilities — all parsed instantly from Showdown format."
            color="from-accent-purple to-accent-pink"
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.9-9.9l4.5 4.5a4.5 4.5 0 010 6.364l-4.5 4.5a4.5 4.5 0 01-7.244-1.242" />
              </svg>
            }
            title="Shareable Links"
            description="Save your team and get a unique URL you can share with friends, teammates, or post on forums."
            color="from-accent-blue to-accent-purple"
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
            }
            title="Browse & Discover"
            description="Explore public team pastes from the community. Find inspiration for your next competitive build."
            color="from-accent-gold to-accent-red"
          />
        </div>
      </section>

      <section className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <StepCard step="1" title="Paste" description="Copy your team from Pokemon Showdown's teambuilder and paste it into PasteMon." />
          <StepCard step="2" title="Preview" description="See your team rendered with sprites, stats, moves, and all the details — live as you type." />
          <StepCard step="3" title="Share" description="Save your team and get a unique link to share anywhere. It's that simple." />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-dark-500 hover:shadow-lg hover:shadow-accent-purple/5">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-dark-300">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-dark-700 text-2xl font-bold gradient-text">
        {step}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-dark-300">{description}</p>
    </div>
  );
}
