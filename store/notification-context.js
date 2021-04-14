import { createContext, useEffect, useState } from 'react';
const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotifications, setActiveNotifications] = useState();

  useEffect(() => {
    if (
      activeNotifications &&
      (activeNotifications.status === 'success' ||
        activeNotifications.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotifications(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotifications]);

  function showNotificationHandler(notificationData) {
    setActiveNotifications(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotifications(null);
  }

  const context = {
    notification: activeNotifications,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
