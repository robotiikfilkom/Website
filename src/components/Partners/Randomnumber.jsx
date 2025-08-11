import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function RandomNumber({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.span>{number.to((val) => val.toFixed(0))}</animated.span>;
}
