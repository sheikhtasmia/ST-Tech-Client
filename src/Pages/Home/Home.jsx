import React from 'react';
import Banner from './Banner/Banner';
import AnimatedCursor from '../../Components/AnimatedCursor/AnimatedCursor';
import CreativeWork from './CreativeWork/CreativeWork';
import ProcessFlow from './ProcessFlow/ProcessFlow';
import OperationalBlueprint from './OperationalBlueprint/OperationalBlueprint';
import StTechApproach from './StTechApproach/StTechApproach';
import BrandsWorks from './BrandsWorks/BrandsWorks';


const Home = () => {
  return (
    <div className="relative">
      <AnimatedCursor></AnimatedCursor>
      <Banner></Banner>
      <BrandsWorks></BrandsWorks>
      <CreativeWork></CreativeWork>

      <ProcessFlow></ProcessFlow>

      <OperationalBlueprint></OperationalBlueprint>
      <StTechApproach></StTechApproach>

      <BrandsWorks></BrandsWorks>
    </div>
  );
};

export default Home;
