/**
 * Onboarding Layout
 * 
 * PRD: US-75 - Users can select their preferred avatar during onboarding
 * UX Decision: Full-screen focused flow to minimize distractions during avatar selection.
 * This is a critical decision point that affects all future AI interactions.
 */

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed header with logo */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-lg font-semibold text-slate-900">Midas</span>
        </div>
      </header>
      
      {/* Main content with top padding for fixed header */}
      <main className="pt-20 pb-8">
        {children}
      </main>
    </div>
  )
}
