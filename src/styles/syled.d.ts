/**
 * IMPORTS
 */
import 'styled-components';
import theme from './theme';


/**
 * Theme type.
 */
type Theme = typeof theme;


/**
 * Styled components module.
 */
declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends Theme { }
}