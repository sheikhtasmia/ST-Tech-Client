import React from 'react';
import Banner from './Banner/Banner';
import AnimatedCursor from '../../Components/AnimatedCursor/AnimatedCursor';
import CreativeWork from './CreativeWork/CreativeWork';
import ProcessFlow from './ProcessFlow/ProcessFlow';


const Home = () => {
  return (
    <div className="relative">
      <AnimatedCursor></AnimatedCursor>
      <Banner></Banner>
      <CreativeWork></CreativeWork>
      <ProcessFlow></ProcessFlow>
    </div>
  );
};

export default Home;
