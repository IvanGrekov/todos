import React from 'react';

import { ButtonType } from '../../types';

import './Button.scss';

export const Button = React.memo(
  ({
    handler = () => {},
    text,
    title,
    disabled = false,
    type = 'button',
  }: {
    handler?: Function;
    text: string;
    title: string;
    disabled?: boolean;
    type?: ButtonType;
  }) => {
    return (
      <button
        className="Button"
        title={title}
        disabled={disabled}
        type={type}
        onClick={() => {
          handler();
        }}
      >
        {text}
      </button>
    );
  }
);
