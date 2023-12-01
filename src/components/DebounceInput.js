import React, { useEffect, useState } from 'react';
let timeoutId = null;

const DebounceInput = ({ delay = 300, onChange, value, min, ...restProps }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const changeWithDebounce = event => {
    clearTimeout(timeoutId);
    event.persist();
    setInputValue(event.target.value);
    if (event.target.value.length < min) {
      return;
    }
    timeoutId = setTimeout(() => {
      onChange(event.target.value);
    }, delay);
  };

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  return <input value={inputValue} onChange={changeWithDebounce} {...restProps} />;
};

export default DebounceInput;
