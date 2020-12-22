import React from 'react';

const getTimeRemainingStr = (timeMs) => {
  const min = Math.floor(timeMs / 1000 / 60);
  const minStr = ('00' + min).slice(-2);
  const sec = Math.floor((timeMs / 1000) % 60);
  const secStr = ('00' + sec).slice(-2);
  return `${minStr}:${secStr}`;
}

export default function Timer({timeRemaining, warnMs = 60000}){
  const timeStr = getTimeRemainingStr(timeRemaining);
  const style = {
    color: timeRemaining < warnMs ? 'red' : 'inherit',
  }
  return (
    <span>
      Time remaining: <span style={style}>{timeStr}</span>
    </span>
  )
}