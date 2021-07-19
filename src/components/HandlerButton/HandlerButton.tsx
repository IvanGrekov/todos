import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

import './HandlerButton.scss';

interface Props {
  handler: MouseEventHandler<HTMLButtonElement>;
  title: string;
  whiteBackground?: boolean;
  buttonClose?: boolean;
  buttonEdit?: boolean;
}

export const HandlerButton = React.memo(
  ({
    handler,
    title,
    whiteBackground = false,
    buttonClose = false,
    buttonEdit = false,
  }: Props) => {
    return (
      <button
        className={classNames('HandlerButton', {
          'HandlerButton--white': whiteBackground,
          'HandlerButton--close': buttonClose,
          'HandlerButton--edit': buttonEdit,
        })}
        title={title}
        onClick={handler}
      />
    );
  }
);
