import React, { useRef, useEffect } from 'react';

const InfiniteScroll = ({ children, loadMore }) => {
  const scrollRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        loadMore();
      }
    };

    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore]);

  return (
    <div ref={scrollRef} style={{ height: '400px', overflowY: 'scroll' }}>
      {children}
    </div>
  );
};

export default InfiniteScroll;
