import React, {ReactNode} from 'react';
import {AnimationView} from './animation-view';

export const AnimatedViewCalendar: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({children}) => <AnimationView side={'right'}>{children}</AnimationView>;
