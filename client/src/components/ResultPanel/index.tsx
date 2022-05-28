import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

import './_resultPanel.scss';

const ResultPanel = () => {
  return (
    <div className='result-panel'>
      <div className='settings'>
        <span className='show-info'>Showing 1-20 results of 1000</span>
        <div className='setting setting-results'>
          <label htmlFor='results-number'>Results/page</label>
          <select name='results-number' id='results-number'>
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div className='setting setting-sort'>
          <label>Sort</label>
          <select>
            <option>Title (Asc)</option>
            <option>Title (Des)</option>
          </select>
        </div>
        <div className='setting setting-available'>
          <label>Available</label>
          <input type='checkbox'></input>
        </div>
      </div>
      <div className='display'></div>
      <div className='pagination'>
        <button className='btn btn-first'>
          <FaAngleDoubleLeft className='icon icon-first' />
        </button>
        <button className='btn btn-back'>
          <RiArrowDropLeftLine className='icon icon-back' />
        </button>
        <button className='btn btn-page'>1</button>
        <button className='btn btn-page'>2</button>
        <button className='btn btn-page'>3</button>
        <button className='btn btn-page'>4</button>
        <button className='btn btn-page'>5</button>
        <button className='btn btn-next'>
          <RiArrowDropRightLine className='icon icon-next' />
        </button>
        <button className='btn btn-last'>
          <FaAngleDoubleRight className='icon icon-last' />
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
