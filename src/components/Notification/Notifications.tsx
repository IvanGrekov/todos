import React from 'react';
import classNames from 'classnames';

import './Notification.scss';

interface Props {
  text: string;
  errorStatus?: boolean;
  successStatus?: boolean;
}

export const Notification = React.memo(
  ({ text, errorStatus = false, successStatus = false }: Props) => {
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
