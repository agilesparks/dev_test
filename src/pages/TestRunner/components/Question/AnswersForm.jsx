import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const ANSWERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

const AnswerContainer = styled.div`
  & p {
    display: inline-block;
    flex: 1;
    margin: 0;
  }
`
const Label = styled.label`
  display: flex;
  padding: 0.5em 0;
  &:hover {
    background: #eee;
  } 
`
const Img = styled.img`
  vertical-align: top;
`
const Bullet = styled.span`
  font-weight: bold;
  margin: 0 0.5em;
`
export default function AnswersForm({answers, selected, onChange, toAssetsUrl}){
  return (
    <form>
      {
        answers.map((item, idx) => {
          const imageUrl = item.image && toAssetsUrl(item.image);
          return (
            <AnswerContainer key={idx}>
              <Label>
                <input 
                  type="radio" 
                  value={ANSWERS[idx]}
                  checked={selected === ANSWERS[idx]}
                  onChange={onChange}
                /> <Bullet>{idx + 1} -</Bullet> {item.text && <ReactMarkdown source={item.text} />}
                {imageUrl && (
                  <Img 
                    key={imageUrl}
                    srcSet={`${imageUrl} 100w`} 
                    sizes="50px" 
                    src={imageUrl} 
                    alt={`Answer ${idx}`}
                  />
                )}
              </Label>
            </AnswerContainer>
          )
        })
      }
    </form>
  )
}