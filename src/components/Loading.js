import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Loading = ({ count = 3, height = 60 }) => {
  return (
    <SkeletonTheme baseColor="rgba(255,255,255,0.03)" highlightColor="rgba(255,255,255,0.05)">
      {/*<SkeletonTheme baseColor="#202020" highlightColor="#444">*/}
      <Skeleton count={count} className="" height={height} />
    </SkeletonTheme>
  );
};

export default Loading;
