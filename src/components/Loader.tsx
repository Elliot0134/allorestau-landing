import React from 'react';
import styled from 'styled-components';

interface LoaderProps {
  themeColor: string;
}

const Loader = ({ themeColor }: LoaderProps) => {
  return (
    <StyledWrapper $themeColor={themeColor}>
      <div className="loader">
        <span className="letter">C</span>
        <span className="letter">h</span>
        <span className="letter">a</span>
        <span className="letter">r</span>
        <span className="letter">g</span>
        <span className="letter">e</span>
        <span className="letter">m</span>
        <span className="letter">e</span>
        <span className="letter">n</span>
        <span className="letter">t</span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $themeColor: string }>`
  .loader {
    --ANIMATION-DELAY-MULTIPLIER: 70ms;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;
  }

  .loader .letter {
    padding: 0;
    margin: 0;
    font-size: 4rem;
    font-weight: 700;
    font-family: 'Outfit', sans-serif;
    color: ${props => props.$themeColor};
    -webkit-text-stroke: 3px #fdefd5;
    text-stroke: 3px #fdefd5;
    paint-order: stroke fill;
    transform: translateY(4rem);
    opacity: 0;
    animation: hideAndSeek 1s alternate infinite cubic-bezier(0.86, 0, 0.07, 1);
  }

  .loader .letter:nth-child(1) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 0);
  }
  .loader .letter:nth-child(2) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 1);
  }
  .loader .letter:nth-child(3) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 2);
  }
  .loader .letter:nth-child(4) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 3);
  }
  .loader .letter:nth-child(5) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 4);
  }
  .loader .letter:nth-child(6) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 5);
  }
  .loader .letter:nth-child(7) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 6);
  }
  .loader .letter:nth-child(8) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 7);
  }
  .loader .letter:nth-child(9) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 8);
  }
  .loader .letter:nth-child(10) {
    animation-delay: calc(var(--ANIMATION-DELAY-MULTIPLIER) * 9);
  }

  @keyframes hideAndSeek {
    0% {
      transform: translateY(4rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0rem);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .loader .letter {
      font-size: 2.5rem;
      -webkit-text-stroke: 2px #fdefd5;
      text-stroke: 2px #fdefd5;
    }
    .loader {
      gap: 0.25rem;
    }
  }
`;

export default Loader;
