/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import React from 'react';

const Transition = React.forwardRef((
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ): JSX.Element => <Slide direction='up' ref={ref} {...props} />);

export default Transition;