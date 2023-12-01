import React, { useState } from 'react';
import DebounceInput from '../../components/DebounceInput';

const Sidebar = () => {
  const [val, setVal] = useState('');
  return (
    <div>
      <h1>Sidebar</h1>
      <DebounceInput
        className="dg_input"
        type="text"
        placeholder={'placeholder'}
        onChange={val => setVal(val)}
        value={val}
      />
      <h2>value is {val}</h2>
    </div>
  );
};

export default Sidebar;
