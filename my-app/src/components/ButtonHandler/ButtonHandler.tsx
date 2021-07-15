import React from 'react';
import classNames from 'classnames';

import './ButtonHandler.scss';

export const ButtonHandler = ({
  handler,
  title,
  whiteBackground = false,
  buttonClose = false,
  buttonEdit = false,
}: {
  handler: Function;
  title: string;
  whiteBackground?: boolean;
  buttonClose?: boolean;
  buttonEdit?: boolean;
}) => {
  return (
    <button
      className={classNames('ButtonCloser', {
        'ButtonCloser--white': whiteBackground,
        'ButtonCloser--close': buttonClose,
        'ButtonCloser--edit': buttonEdit,
      })}
      title={title}
      onClick={() => {
        handler();
      }}
    />
  );
};
