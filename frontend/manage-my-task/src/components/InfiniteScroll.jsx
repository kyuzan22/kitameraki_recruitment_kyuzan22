import React, { useRef, useEffect } from 'react';

const InfiniteScroll = ({ children, loadMore }) => {
  const scrollRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore();
      }
    };

    scrollRef.current.addEventListener('scroll', handleScroll); 
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll); 
    };
  }, [loadMore]);

  return (
    <div ref={scrollRef} style={{ height: 'calc(100vh - 377px)', padding:'0px 20px', overflowY: 'scroll' }}>
      {children}
    </div>
  );
};

export default InfiniteScroll;
