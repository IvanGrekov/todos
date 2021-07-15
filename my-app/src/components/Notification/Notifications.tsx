import React from 'react';
import classNames from 'classnames';

import './Notification.scss';

export const Notification = React.memo(
  ({
    text,
    errorStatus = false,
    successStatus = false,
  }: {
    text: string;
    errorStatus?: boolean;
    successStatus?: boolean;
  }) => {
    return (
      <h3
        className={classNames('Notification', {
          'Notification--error': errorStatus,
          'Notification--success': successStatus,
        })}
      >
        {text}
      </h3>
    );
  }
);
