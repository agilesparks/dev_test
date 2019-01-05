import React from 'react';
import styled from 'styled-components';

const ANSWERS = ['a', 'b', 'c', 'd'];

const AnswerContainer = styled.div`
  margin-bottom: 1em;
`
const Img = styled.img`
  vertical-align: top;
`
export default function AnswersForm({answers, selected, onChange, toAssetsUrl}){
  const selectedIdx = parseInt(selected);
  return (
    <form>
      {
        answers.map((item, idx) => {
          const imageUrl = item.image && toAssetsUrl(item.image);
          return (
            <AnswerContainer key={idx}>
              <label>
                <input 
                  type="radio" 
                  value={ANSWERS[idx]}
                  checked={selected === ANSWERS[idx]}
                  onChange={onChange}
                /> {item.text && item.text}
                {imageUrl && (
                  <Img 
                    key={imageUrl}
                    srcSet={`${imageUrl} 100w`} 
                    sizes="50px" 
                    src={imageUrl} 
                    alt={`Answer ${idx}`}
                  />
                )}
              </label>
            </AnswerContainer>
          )
        })
      }
    </form>
  )
}