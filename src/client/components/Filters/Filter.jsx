import React from 'react';

const Filter = ({ list, title, classList, classElement, toggleFilter }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul className={classList}>
        {list.map((element, i) => (
          <li className={classElement} key={i}>
            <input
              type="checkbox"
              name={classElement}
              value={element}
              id={element}
              onChange={e => toggleFilter(classElement, element, e.target.checked)}
            />
            <label htmlFor={element}>{element}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
