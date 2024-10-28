import React, { useMemo, useEffect, useRef } from 'react';
import { notification } from 'antd';
import { getSavingTip } from '../../../controller/savingTipController';

const Context = React.createContext({
  name: 'Default',
});

const Notifications = () => {
  const [api, contextHolder] = notification.useNotification();
  const hasNotifiedRef = useRef(false); 

  const openNotification = (placement, tip) => {
    api.info({
      message: 'Saving Tips',
      description: tip, 
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  useEffect(() => {
    const showNotifications = async () => {
      if (!hasNotifiedRef.current) {
        hasNotifiedRef.current = true; 
        while (true) {
          const tip = await getSavingTip();
          if (tip && tip.tip) {
            openNotification('bottomRight', tip.tip);
          }
          await new Promise(resolve => setTimeout(resolve, 30000)); 
        }
      }
    };

    showNotifications();
  }, [api]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    </Context.Provider>
  );
};

export default Notifications;
