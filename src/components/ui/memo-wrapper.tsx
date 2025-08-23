import React, { memo } from 'react';

interface MemoWrapperProps {
  children: React.ReactNode;
  dependencies?: any[];
}

const MemoWrapper: React.FC<MemoWrapperProps> = memo(({ children }) => {
  return <>{children}</>;
});

MemoWrapper.displayName = 'MemoWrapper';

export default MemoWrapper;