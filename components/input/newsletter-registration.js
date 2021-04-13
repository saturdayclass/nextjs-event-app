import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef();
  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const req = await fetch('/api/newslatter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await req.json();
    console.log(res);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
