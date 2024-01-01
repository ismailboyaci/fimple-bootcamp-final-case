import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '~/styles/dropdown.scss';

const Dropdown = ({ options, onSelect }) => {
  const { i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialSelection, setIsInitialSelection] = useState(true);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsInitialSelection(false);

    if (option.value !== selectedOption.value) {
      onSelect(option);
    }
  };

  useEffect(() => {
    if (isInitialSelection) {
      setSelectedOption(options[0]);
      setIsInitialSelection(false);
    }
  }, [isInitialSelection, options]);

  return (
    <div className='dropdown-container'>
      <div className='selected-option' onClick={() => setIsOpen(!isOpen)}>
        {selectedOption && (
          <>
            {selectedOption.icon && selectedOption.icon}
            {!selectedOption.icon && <span>{selectedOption.text}</span>}
          </>
        )}
      </div>
      {isOpen && (
        <div className='options-container'>
          {options.map((option) => (
            <div
              key={option.value}
              className='option'
              onClick={() => handleOptionClick(option)}
            >
              {option.icon && option.icon}
              {!option.icon && <span>{option.text}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

