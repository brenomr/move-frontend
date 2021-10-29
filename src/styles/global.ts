/**
 * IMPORTS
 */
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import theme from './theme';
import Background from "assets/images/background.jpg";

/**
 * I am a global style.
 */
export default createGlobalStyle`
   ${normalize}
   a{
    transition: all ease 0.4s;
   }
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }
 
   *,
   *::before,
   *::after {
     box-sizing: inherit;
   }
 
   html {
     box-sizing: border-box;
     height: -webkit-fill-available;
     -ms-overflow-style: scrollbar;
   }
 
   body {
     min-height: 100vh;
     min-height: -webkit-fill-available;
     background: url(${Background}) no-repeat top right fixed;
     -webkit-background-size: cover;
     -moz-background-size: cover;
     -o-background-size: cover;
     background-size: cover;
      
   }
 
   img {
     max-width: 100%;
   }
 
   button {
     background-color: transparent;
     border: none;
     box-shadow: none;
     cursor: pointer;
     outline: none;
     padding: 0;
     -webkit-box-shadow: none;
   }
 
   @-ms-viewport {
     width: device-width;
   }
 

   .swal2-modal{
     font-family: ${theme.fonts.primary};
   }
   .swal2-styled.swal2-confirm{
     background-color: ${theme.colors.secondary};
   }

     body {
       font: 400 1rem ${theme.fonts.primary};
     }
 
     *::selection {
       color: white;
       background: ${theme.colors.primaryDark};
     }
 
     *::-webkit-scrollbar {
       width: 0.5rem;
     }
 
     *::-webkit-scrollbar-track {
       border-radius: 40px;
       background: #0001;
     }
 
     *::-webkit-scrollbar-thumb {
       border-radius: 40px;
       background-color: #2225;
       transition: background-color 0.3s ease-out;
     }
 
     *:hover::-webkit-scrollbar-thumb {
       background-color: #2228;
     }
 
     a {
       color: ${theme.colors.secondary};
       &:hover{
         color: ${theme.colors.primary};
       }
     }
 `;
