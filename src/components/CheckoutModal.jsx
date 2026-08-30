import React, { useState, useEffect, useRef } from 'react';
import {
  X, CreditCard, Lock, CheckCircle2, Ticket, Calendar,
  MapPin, Loader2, ShieldCheck, Film, Armchair,
} from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────────────────
const formatCardNumber = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim();

const formatExpiry = (v) => {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const CARD_BRANDS = {
  '4': { label: 'Visa', color: 'text-blue-400' },
  '5': { label: 'Mastercard', color: 'text-orange-400' },
  '3': { label: 'Amex', color: 'text-cyan-400' },
};
const cardBrand = (num) => CARD_BRANDS[num.replace(/\s/g, '')[0]] || null;

// ── Reusable field wrapper ─────────────────────────────────────────────────────
const inputCls = (hasError) =>
  `w-full bg-slate-950/60 border rounded-xl py-3.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm ${
    hasError
      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
      : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/30'
  }`;

const Field = ({ label, id, error, right, children }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      {right}
    </div>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

// ── Main Modal ─────────────────────────────────────────────────────────────────
const CheckoutModal = ({ isOpen, onClose, onSuccess, movie, selectedSeats, totalPrice, ticketPrice }) => {
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', cardHolder: '' });
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  // Generate a stable booking ref for the session
  const [bookingRef] = useState(() => `CV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setForm({ cardNumber: '', expiry: '', cvv: '', cardHolder: '' });
      setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  // Close on Escape (except during processing)
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && step !== 'processing') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, step, onClose]);

  if (!isOpen) return null;

  // ── Validation ───────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number.';
    if (form.expiry.length < 5) e.expiry = 'Enter expiry as MM/YY.';
    if (form.cvv.length < 3) e.cvv = 'CVV must be 3–4 digits.';
    if (!form.cardHolder.trim()) e.cardHolder = 'Cardholder name is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStep('processing');
    setTimeout(() => setStep('success'), 1800);
  };

  const handleDone = () => {
    onClose();
    if (onSuccess) onSuccess();
  };

  const brand = cardBrand(form.cardNumber);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        onClick={step !== 'processing' ? onClose : undefined}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.12)] overflow-hidden animate-fade-in max-h-[92vh] overflow-y-auto">

        {/* Close */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ══════════════ FORM ══════════════════════════════════════════════ */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} noValidate>
            {/* Header */}
            <div className="px-8 pt-8 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
              </div>
              <p className="text-gray-400 text-sm">Complete your payment to confirm tickets.</p>
            </div>

            <div className="px-8 py-6 space-y-5">
              {/* Order summary */}
              <div className="bg-slate-800/60 border border-white/[0.08] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Film className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-white font-semibold truncate">{movie?.title || 'Movie'}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <Armchair className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{selectedSeats.join(', ')}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{selectedSeats.length} ticket{selectedSeats.length > 1 ? 's' : ''} × ${ticketPrice}</span>
                  <span className="text-2xl font-extrabold text-white">${totalPrice}</span>
                </div>
              </div>

              {/* Card Number */}
              <Field
                label="Card Number"
                id="checkout-cardNumber"
                error={errors.cardNumber}
                right={brand && <span className={`text-xs font-bold ${brand.color}`}>{brand.label}</span>}
              >
                <input
                  ref={firstInputRef}
                  id="checkout-cardNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  maxLength={19}
                  onChange={(e) => setForm(f => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))}
                  className={inputCls(errors.cardNumber)}
                />
              </Field>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry Date" id="checkout-expiry" error={errors.expiry}>
                  <input
                    id="checkout-expiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={form.expiry}
                    maxLength={5}
                    onChange={(e) => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                    className={inputCls(errors.expiry)}
                  />
                </Field>
                <Field label="CVV" id="checkout-cvv" error={errors.cvv}>
                  <input
                    id="checkout-cvv"
                    type="text"
                    inputMode="numeric"
                    placeholder="•••"
                    value={form.cvv}
                    maxLength={4}
                    onChange={(e) => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className={inputCls(errors.cvv)}
                  />
                </Field>
              </div>

              {/* Cardholder Name */}
              <Field label="Cardholder Name" id="checkout-cardHolder" error={errors.cardHolder}>
                <input
                  id="checkout-cardHolder"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="cc-name"
                  value={form.cardHolder}
                  onChange={(e) => setForm(f => ({ ...f, cardHolder: e.target.value }))}
                  className={inputCls(errors.cardHolder)}
                />
              </Field>

              {/* Security note */}
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Your payment info is encrypted and never stored.</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-base"
              >
                <ShieldCheck className="w-5 h-5" />
                Confirm Payment — ${totalPrice}
              </button>
            </div>
          </form>
        )}

        {/* ══════════════ PROCESSING ════════════════════════════════════════ */}
        {step === 'processing' && (
          <div className="px-8 py-24 flex flex-col items-center justify-center gap-6 text-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-cyan-500/15 animate-ping" />
              <div className="relative w-24 h-24 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
              </div>
            </div>
            <div>
              <p className="text-white text-xl font-bold mb-1">Processing Payment</p>
              <p className="text-gray-400 text-sm">Please wait, do not close this window…</p>
            </div>
          </div>
        )}

        {/* ══════════════ SUCCESS ═══════════════════════════════════════════ */}
        {step === 'success' && (
          <div className="px-8 py-10 flex flex-col items-center text-center gap-6 animate-fade-in">
            {/* Glow checkmark */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 scale-150 blur-xl" />
              <div className="relative w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Payment Successful!</h2>
              <p className="text-gray-400 text-sm">Your tickets are confirmed. Enjoy the show!</p>
            </div>

            {/* E-ticket */}
            <div className="w-full bg-slate-800/70 border border-white/10 rounded-2xl overflow-hidden">
              {/* Top strip */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-b border-white/10 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">E-Ticket</span>
                </div>
                <span className="text-xs font-mono text-gray-400">{bookingRef}</span>
              </div>

              {/* Ticket body */}
              <div className="px-6 py-5 space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Film className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Movie</p>
                    <p className="text-white font-bold">{movie?.title || 'Movie'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Armchair className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Seats</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSeats.map(s => (
                        <span key={s} className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md text-sm font-semibold">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Date</p>
                      <p className="text-white text-sm font-medium">{today}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Venue</p>
                      <p className="text-white text-sm font-medium">Screen 1 • 2D</p>
                    </div>
                  </div>
                </div>

                {/* Perforation */}
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-950 -ml-10 flex-shrink-0" />
                  <div className="flex-1 border-t-2 border-dashed border-white/10 mx-2" />
                  <div className="w-4 h-4 rounded-full bg-slate-950 -mr-10 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-400 text-sm">Total Paid</span>
                  <span className="text-2xl font-extrabold text-emerald-400">${totalPrice}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] text-base"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
