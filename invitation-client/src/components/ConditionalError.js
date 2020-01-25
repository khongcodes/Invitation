import React from 'react';

const ConditionalError = ({ condition, text, classText }) => (
  <>
    {condition ?
      <div className={`Error ${classText}`}>
        {text}
      </div>
      :
      <></>
    }
  </>
)

export default ConditionalError