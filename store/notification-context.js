import { createContext } from 'react';
import { useState } from 'react';
const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotifications, setNotifications] = useState();

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
