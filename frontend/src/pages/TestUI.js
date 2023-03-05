import React from 'react';
import './TestUI.css';
import Box from '@material-ui/core/Box';

function TestUI() {
  return (
    <div className='test'>
      <Box
        boxShadow={6}
        bgcolor='background.paper'
        color='primary'
        borderRadius={5}
        m={2}
        p={2}
        display='flex'
        alignItems='center'
        justifyContent='center'
        style={{ width: '18rem', height: '15rem' }}
        className='box'>
        <h4>test ui</h4>
      </Box>
      <Box
        boxShadow={6}
        bgcolor='background.paper'
        color='primary'
        borderRadius={5}
        m={2}
        p={2}
        display='flex'
        alignItems='center'
        justifyContent='center'
        style={{ width: '18rem', height: '15rem' }}
        className='box'>
        <h4>test ui</h4>
      </Box>
      <Box
        boxShadow={6}
        bgcolor='background.paper'
        color='primary'
        borderRadius={5}
        m={2}
        p={2}
        display='flex'
        alignItems='center'
        justifyContent='center'
        style={{ width: '18rem', height: '15rem' }}
        className='box'>
        <h4>test ui</h4>
      </Box>
    </div>
  );
}

export default TestUI;
