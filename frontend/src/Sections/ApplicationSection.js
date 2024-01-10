import React from 'react';
import OptionSelection from "../AIOptions/OptionSelection";

const ApplicationSection = ({ option, filterCondition, handleFilterChange, arrayItems, selectOption }) => (
  <>
    {Object.values(option).length === 0 && (
      <>
        <div className="buttons has-addons is-centered">
          <button
            className={`button ${filterCondition === 'copywriting' ? 'is-info' : ''}`}
            onClick={() => handleFilterChange('copywriting')}
          >
            Copywriting
          </button>
        </div>
        <OptionSelection arrayItems={arrayItems.filter(item => item.kategori === filterCondition)} selectOption={selectOption} />
      </>
    )}
  </>
);

export default ApplicationSection;
