import React from 'react';

export default function QuestionText({text, imageUrl}) {
  return (
    <div>
      {text && text}<br/>
      {imageUrl && <img srcSet={`${imageUrl} 100w`} sizes="50px" src={imageUrl} alt="Question"/>}
    </div>
  )
}