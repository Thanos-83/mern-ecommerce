import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Checkout.css';
import Address from '../components/Address';
import PaymentMethod from '../components/PaymentMethod';
import Order from '../components/Order';

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Address', 'Method', 'Pay'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className='checkout'>
      <div className='checkout__stepper'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className='checkout__info'>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : activeStep === 0 ? (
          <div>
            <div>
              <Address
                next={handleNext}
                back={handleBack}
                activeStep={activeStep}
              />
            </div>
          </div>
        ) : activeStep === 1 ? (
          <div>
            <PaymentMethod
              next={handleNext}
              back={handleBack}
              activeStep={activeStep}
            />
          </div>
        ) : activeStep === 2 ? (
          <div>
            <Order
              next={handleNext}
              back={handleBack}
              activeStep={activeStep}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Checkout;
