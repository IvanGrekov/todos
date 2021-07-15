import React from 'react';
import classNames from 'classnames';

import './HandlerButton.scss';

export const HandlerButton = React.memo(
  ({
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
        className={classNames('HandlerButton', {
          'HandlerButton--white': whiteBackground,
          'HandlerButton--close': buttonClose,
          'HandlerButton--edit': buttonEdit,
        })}
        title={title}
        onClick={() => {
          handler();
        }}
      />
    );
  }
);
