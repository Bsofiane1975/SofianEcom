 

import Spinner from 'react-bootstrap/Spinner';

function LoadingBox() {
  return (
    <>
      <Spinner animation="border" size="sm" />
      <Spinner animation="border" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
    </>
  );
}
export default LoadingBox

// export default SizesExample;
// import React from 'react';
// import { Stepper, Step, StepLabel, Button } from '@material-ui/core';

// const steps = ['Step 1', 'Step 2', 'Step 3', 'Step4'];

// const MyStepper = () => {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <div>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
//         <Button disabled={activeStep === steps.length - 1} onClick={handleNext}>Next</Button>
//       </div>
//     </div>
//   );
// };

// export default MyStepper;
