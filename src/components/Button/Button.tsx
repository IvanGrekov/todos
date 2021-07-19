import React, { MouseEventHandler } from 'react';

import { ButtonType } from '../../types';

import './Button.scss';

interface Props {
  handler?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  title: string;
  disabled?: boolean;
  type?: ButtonType;
}

export const Button = React.memo(
  ({
    handler = () => {},
    text,
    title,
    disabled = false,
    type = 'button',
  }: Props) => {
    return (
      <button
        className="Button"
        title={title}
        disabled={disabled}
        type={type}
        onClick={handler}
      >
        {text}
      </button>
    );
  }
);
