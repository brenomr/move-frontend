/**
 * IMPORTS
 */
import React from 'react';
import { IProps } from './index.d';
import { XRow } from './styles';


/**
 * I am a form row component.
 */
const Row = (props: IProps): React.ReactElement => (
  <XRow style={{ justifyContent: props.justify }}>{props.children}</XRow>
);


/**
 * EXPORTS
 */
export default Row;