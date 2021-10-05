/**
 * IMPORTS
 */
import styled from 'styled-components';
import { devices } from 'styles/devices';


/**
 * I am a styled form row.
 */
const XRow = styled.span`
  display: flex;
  width: 100%;
  margin-top: 10px;

  > * {
    flex: 1;
  }

  > * + * {
    margin-left: 1rem;
  }
  @media ${devices.desktop} {
    display: block;
    & > *{
      width: 100%;
      margin-left: 0;
    }
  }
`;


/**
 * EXPORTS
 */
export { XRow };
