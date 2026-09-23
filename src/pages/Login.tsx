import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('admin@medbill.in');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Email is required'); return; }
    if (!forgot && !password) { setError('Password is required'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (forgot) { setForgot(false); setError(''); return; }
      if (password === 'admin' || password.length > 0) onLogin();
      else setError('Invalid credentials');
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ background: 'var(--sidebar)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: 'var(--primary)' }}>MB</div>
          <span className="text-white font-semibold text-lg">MedBill Pro</span>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Streamline your<br />healthcare billing
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#94a3b8' }}>
            Manage patients, invoices, payments, and insurance claims — all in one place.
          </p>

          <div className="space-y-4">
            {[
              { icon: '📊', label: 'Real-time revenue analytics' },
              { icon: '🏥', label: 'Insurance claim tracking' },
              { icon: '🔒', label: 'HIPAA-compliant & secure' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  {item.icon}
                </div>
                <span className="text-sm" style={{ color: '#cbd5e1' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {['Star Health', 'HDFC Ergo', 'Max Bupa', 'ICICI Lombard'].map(p => (
            <div key={p} className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>{p}</div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: 'var(--sidebar)' }}>MB</div>
              <span className="font-semibold text-lg">MedBill Pro</span>
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
              {forgot ? 'Reset password' : 'Welcome back'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {forgot ? 'Enter your email to receive a reset link' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@medbill.in"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: 'var(--border)', background: 'white', color: 'var(--foreground)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            {!forgot && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>Password</label>
                  <button type="button" onClick={() => setForgot(true)} className="text-sm" style={{ color: 'var(--primary)' }}>
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                  style={{ borderColor: 'var(--border)', background: 'white', color: 'var(--foreground)' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-150"
              style={{ background: 'var(--primary)', color: 'white', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Please wait...' : forgot ? 'Send Reset Link' : 'Sign In'}
            </button>

            {forgot && (
              <button type="button" onClick={() => setForgot(false)} className="w-full py-2.5 rounded-lg text-sm font-medium border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                Back to Sign In
              </button>
            )}
          </form>

          <p className="text-xs text-center mt-8" style={{ color: 'var(--muted-foreground)' }}>
            Demo: any email + any password to sign in
          </p>
        </div>
      </div>
    </div>
  );
}
