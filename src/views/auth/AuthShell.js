import logo from 'img/logo.svg'

function AuthShell({ title, subtitle, submitLabel, onSubmit, onCancel, children, footer }) {
  return (
    <div className="min-h-screen bg-backdrop flex items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <img src={logo} alt="Spotify" className="h-10 mx-auto mb-8" />
        <div className="bg-footer rounded-2xl p-8 border border-white/5 shadow-spotify">
          <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
          <p className="text-center text-sm text-link mb-8">{subtitle}</p>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {children}
            <button
              type="submit"
              className="mt-2 h-12 rounded-full bg-primary text-black font-bold text-base hover:scale-[1.02] transition-transform"
            >
              {submitLabel}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="h-12 rounded-full border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        {footer && <div className="text-center mt-8 text-sm text-link">{footer}</div>}
      </div>
    </div>
  )
}

export function AuthField({ label, error, ...props }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-link">{label}</span>
      <input
        {...props}
        className={`h-12 rounded-lg bg-backdrop px-4 text-sm text-white placeholder-link outline-none focus:border-primary border ${error ? 'border-red-400' : 'border-white/10'}`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  )
}

export default AuthShell