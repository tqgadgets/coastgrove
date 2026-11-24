import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { quoteFormOptions } from '../data/site.js';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';
import './QuoteForm.css';

const FORM_EASE = [0.22, 1, 0.36, 1];
const THANK_YOU_DURATION_MS = 5000;

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  service: '',
  budget: '',
  message: '',
};

const FIELD_ORDER = [
  'fullName',
  'email',
  'phone',
  'city',
  'service',
  'budget',
  'message',
];

const DESKTOP_DOTS = [
  { x: 0, y: -78, color: 'lime' },
  { x: 56, y: -56, color: 'green' },
  { x: 82, y: 0, color: 'lime' },
  { x: 52, y: 52, color: 'green' },
  { x: 0, y: 74, color: 'lime' },
  { x: -58, y: 54, color: 'green' },
  { x: -84, y: -4, color: 'lime' },
  { x: -50, y: -58, color: 'green' },
];

const MOBILE_DOTS = [
  { x: 0, y: -52, color: 'lime' },
  { x: 48, y: -16, color: 'green' },
  { x: 32, y: 42, color: 'lime' },
  { x: -32, y: 42, color: 'green' },
  { x: -48, y: -16, color: 'lime' },
];

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmall(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isSmall;
}

function validateField(name, rawValue) {
  const value = String(rawValue || '').trim();

  switch (name) {
    case 'fullName':
      if (!value) return 'Please enter your full name.';
      if (value.length < 2 || value.length > 80) {
        return 'Name must be between 2 and 80 characters.';
      }
      return '';
    case 'email':
      if (!value) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return 'Please enter a valid email address.';
      }
      return '';
    case 'phone': {
      if (!value) return 'Please enter your phone number.';
      const digits = value.replace(/\D/g, '');
      if (!/^[+\d\s().-]+$/.test(value) || digits.length < 10) {
        return 'Please enter a valid phone number with at least 10 digits.';
      }
      return '';
    }
    case 'city':
      if (!value) return 'Please enter your city.';
      if (value.length < 2 || value.length > 60) {
        return 'City must be between 2 and 60 characters.';
      }
      return '';
    case 'service':
      if (!value || !quoteFormOptions.services.includes(value)) {
        return 'Please select a service.';
      }
      return '';
    case 'budget':
      if (!value || !quoteFormOptions.budgets.includes(value)) {
        return 'Please select a budget range.';
      }
      return '';
    case 'message':
      if (!value) return 'Please tell us a bit about your project.';
      if (value.length < 10 || value.length > 1000) {
        return 'Message must be between 10 and 1000 characters.';
      }
      return '';
    default:
      return '';
  }
}

function validateAll(values) {
  const nextErrors = {};
  FIELD_ORDER.forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) nextErrors[field] = error;
  });
  return nextErrors;
}

function SuccessMessage({
  headingAs: Heading,
  firstName,
  prefersReducedMotion,
  isSmallScreen,
}) {
  const headingRef = useRef(null);
  const dots = isSmallScreen ? MOBILE_DOTS : DESKTOP_DOTS;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <m.div
      key="success"
      className="quote-form__success"
      role="status"
      aria-live="polite"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 24 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 140, damping: 16 },
      }}
      exit={
        prefersReducedMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : { opacity: 0, y: -12, transition: { duration: 0.4, ease: FORM_EASE } }
      }
    >
      <div className="quote-form__success-content">
        <div className="quote-form__success-badge" aria-hidden="true">
          {!prefersReducedMotion && (
            <m.span
              className="quote-form__success-ring"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.9, ease: FORM_EASE, delay: 0.1 }}
            />
          )}

          {!prefersReducedMotion &&
            dots.map((dot, index) => (
              <m.span
                key={`${dots.length}-${index}`}
                className={`quote-form__dot quote-form__dot--${dot.color}`}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: dot.x, y: dot.y, scale: 0.4, opacity: 0 }}
                transition={{
                  duration: 0.9,
                  ease: FORM_EASE,
                  delay: 0.1 + index * 0.03,
                }}
              />
            ))}

          <m.span
            className="quote-form__success-icon"
            initial={prefersReducedMotion ? false : { scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 260, damping: 16, delay: 0.1 },
            }}
          >
            {prefersReducedMotion ? (
              <Check size={32} strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <m.path
                  d="M20 6 9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: FORM_EASE, delay: 0.18 }}
                />
              </svg>
            )}
          </m.span>
        </div>

        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: FORM_EASE, delay: 0.12 },
          }}
        >
          <Heading
            ref={headingRef}
            tabIndex={-1}
            className="quote-form__success-title"
          >
            Thank you, {firstName} for Showing Interest
          </Heading>
        </m.div>

        <m.p
          className="quote-form__success-text"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: FORM_EASE, delay: 0.2 },
          }}
        >
          We will contact you shortly.
        </m.p>
      </div>

      {!prefersReducedMotion && (
        <div className="quote-form__progress-track" aria-hidden="true">
          <m.div
            className="quote-form__progress-bar"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
      )}
    </m.div>
  );
}

export default function QuoteForm({ idPrefix = 'quote', headingAs: Heading = 'h3' }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success'
  const [submittedFirstName, setSubmittedFirstName] = useState('');
  const [minHeight, setMinHeight] = useState(null);

  const stageRef = useRef(null);
  const timeoutRef = useRef(null);
  const restoreFocusRef = useRef(false);

  const prefersReducedMotion = Boolean(useReducedMotion());
  const isSmallScreen = useIsSmallScreen();

  const fieldRefs = {
    fullName: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    city: useRef(null),
    service: useRef(null),
    budget: useRef(null),
    message: useRef(null),
  };

  useEffect(() => {
    if (status !== 'success') return undefined;

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      const stageEl = stageRef.current;
      restoreFocusRef.current = Boolean(
        stageEl && document.activeElement && stageEl.contains(document.activeElement),
      );
      setStatus('idle');
    }, THANK_YOU_DURATION_MS);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [status]);

  function handleFormMount(node) {
    if (!node || status !== 'idle' || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    fieldRefs.fullName.current?.focus();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => {
        if (fieldError) return { ...prev, [name]: fieldError };
        if (!prev[name]) return prev;
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => {
      if (fieldError) return { ...prev, [name]: fieldError };
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  function triggerSuccess() {
    if (stageRef.current) {
      setMinHeight(stageRef.current.offsetHeight);
    }
    const first = values.fullName.trim().split(/\s+/)[0] || 'Friend';
    setSubmittedFirstName(first);
    setValues(INITIAL_VALUES);
    setTouched({});
    setErrors({});
    setHoneypot('');
    setStatus('success');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (status === 'success') return;

    // Honeypot check: behave as normal success without storing or sending anything.
    if (honeypot.trim().length > 0) {
      triggerSuccess();
      return;
    }

    const nextTouched = {};
    FIELD_ORDER.forEach((field) => {
      nextTouched[field] = true;
    });
    setTouched(nextTouched);

    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        fieldRefs[firstInvalid].current?.focus();
      }
      return;
    }

    triggerSuccess();
  }

  return (
    <Card className="quote-form-wrap">
      <div
        ref={stageRef}
        className="quote-form__stage"
        style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (status === 'idle') {
              setMinHeight(null);
            }
          }}
        >
          {status === 'success' ? (
            <SuccessMessage
              key="success"
              headingAs={Heading}
              firstName={submittedFirstName}
              prefersReducedMotion={prefersReducedMotion}
              isSmallScreen={isSmallScreen}
            />
          ) : (
            <m.form
              key="form"
              ref={handleFormMount}
              className="quote-form"
              onSubmit={handleSubmit}
              noValidate
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{
                opacity: 1,
                transition: prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, ease: FORM_EASE },
              }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, transition: { duration: 0.2, ease: FORM_EASE } }
              }
            >
              <Heading className="quote-form__title">Book a Free Quote</Heading>

              <div className="quote-form__hp" aria-hidden="true">
                <label htmlFor={`${idPrefix}-company-website`}>Company website</label>
                <input
                  id={`${idPrefix}-company-website`}
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="quote-form__fields">
                <div className="quote-form__field">
                  <label className="quote-form__label" htmlFor={`${idPrefix}-name`}>
                    Full name
                  </label>
                  <input
                    ref={fieldRefs.fullName}
                    id={`${idPrefix}-name`}
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.fullName ? 'true' : undefined}
                    aria-describedby={
                      errors.fullName ? `${idPrefix}-fullName-error` : undefined
                    }
                    className={`quote-form__input${
                      errors.fullName ? ' quote-form__input--invalid' : ''
                    }`}
                    placeholder="Jordan Taylor"
                  />
                  {errors.fullName && (
                    <span id={`${idPrefix}-fullName-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </span>
                  )}
                </div>

                <div className="quote-form__field">
                  <label className="quote-form__label" htmlFor={`${idPrefix}-email`}>
                    Email
                  </label>
                  <input
                    ref={fieldRefs.email}
                    id={`${idPrefix}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
                    className={`quote-form__input${
                      errors.email ? ' quote-form__input--invalid' : ''
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span id={`${idPrefix}-email-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.email}</span>
                    </span>
                  )}
                </div>

                <div className="quote-form__field">
                  <label className="quote-form__label" htmlFor={`${idPrefix}-phone`}>
                    Phone
                  </label>
                  <input
                    ref={fieldRefs.phone}
                    id={`${idPrefix}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.phone ? 'true' : undefined}
                    aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
                    className={`quote-form__input${
                      errors.phone ? ' quote-form__input--invalid' : ''
                    }`}
                    placeholder="(949) 555-0100"
                  />
                  {errors.phone && (
                    <span id={`${idPrefix}-phone-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </span>
                  )}
                </div>

                <div className="quote-form__field">
                  <label className="quote-form__label" htmlFor={`${idPrefix}-city`}>
                    City
                  </label>
                  <input
                    ref={fieldRefs.city}
                    id={`${idPrefix}-city`}
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.city ? 'true' : undefined}
                    aria-describedby={errors.city ? `${idPrefix}-city-error` : undefined}
                    className={`quote-form__input${
                      errors.city ? ' quote-form__input--invalid' : ''
                    }`}
                    placeholder="Newport Beach"
                  />
                  {errors.city && (
                    <span id={`${idPrefix}-city-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.city}</span>
                    </span>
                  )}
                </div>

                <div className="quote-form__field">
                  <label className="quote-form__label" htmlFor={`${idPrefix}-service`}>
                    Service
                  </label>
                  <select
                    ref={fieldRefs.service}
                    id={`${idPrefix}-service`}
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.service ? 'true' : undefined}
                    aria-describedby={
                      errors.service ? `${idPrefix}-service-error` : undefined
                    }
                    className={`quote-form__select${
                      errors.service ? ' quote-form__input--invalid' : ''
                    }`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {quoteFormOptions.services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span id={`${idPrefix}-service-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.service}</span>
                    </span>
                  )}
                </div>

                <div className="quote-form__field">
                  <label className="quote-form__label" htmlFor={`${idPrefix}-budget`}>
                    Budget
                  </label>
                  <select
                    ref={fieldRefs.budget}
                    id={`${idPrefix}-budget`}
                    name="budget"
                    value={values.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.budget ? 'true' : undefined}
                    aria-describedby={
                      errors.budget ? `${idPrefix}-budget-error` : undefined
                    }
                    className={`quote-form__select${
                      errors.budget ? ' quote-form__input--invalid' : ''
                    }`}
                  >
                    <option value="" disabled>
                      Select a budget range
                    </option>
                    {quoteFormOptions.budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <span id={`${idPrefix}-budget-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.budget}</span>
                    </span>
                  )}
                </div>

                <div className="quote-form__field quote-form__field--full">
                  <div className="quote-form__label-row">
                    <label className="quote-form__label" htmlFor={`${idPrefix}-message`}>
                      Message
                    </label>
                    <span className="quote-form__counter" aria-live="polite">
                      {values.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    ref={fieldRefs.message}
                    id={`${idPrefix}-message`}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={
                      errors.message ? `${idPrefix}-message-error` : undefined
                    }
                    className={`quote-form__textarea${
                      errors.message ? ' quote-form__input--invalid' : ''
                    }`}
                    placeholder="Tell us about your yard and project goals."
                  />
                  {errors.message && (
                    <span id={`${idPrefix}-message-error`} className="quote-form__error">
                      <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
                      <span>{errors.message}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="quote-form__actions">
                <Button type="submit" variant="primary" className="quote-form__submit">
                  Get My Free Quote
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </Button>
                <p className="quote-form__privacy">
                  We only use your details to reply to your request.
                </p>
              </div>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
