import React from 'react';
import { styled } from '@mui/system';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  outlineColor: '#fff',
});

const VisuallyHiddenInputComponent = ({ id, name, onChange, value, type = 'file' }) => {
  return (
    <VisuallyHiddenInput
      id={id}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
    />
  );
};

export default VisuallyHiddenInputComponent;
