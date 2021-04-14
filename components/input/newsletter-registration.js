import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from './../../store/notification-context';
function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    notificationCtx.showNotification({
      title: ' Signin up...',
      status: 'pendisng',
      message: 'Registering for newslatter',
    });
    try {
      const req = await fetch('/api/newslatter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: { 'Content-Type': 'application/json' },
      });
      let res;
      if (req.ok) {
        res = req.json();
      } else {
        throw new Error(res.message || 'something went wrong!');
      }

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully register for newsletter',
        status: 'success',
      });
    } catch (err) {
      notificationCtx.showNotification({
        title: 'Error',
        message: err.message || 'Something went wrong',
        status: 'error',
      });
    }
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
