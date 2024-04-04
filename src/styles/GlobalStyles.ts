import { createGlobalStyle } from "styled-components";
import { fonts } from "./fonts";
import theme from "./theme";
export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    ${fonts}
    a{
        text-decoration: none;
        color: inherit;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 16px;
        vertical-align: baseline;
        font-family: 'Main';
        line-height: 1.5;
        color: ${theme.colors.white};
    }
    body{
        line-height: 1;
        font-family: 'Main', sans-serif;
    }
    ol, ul{
        list-style: none;
    }
    button {
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        color: ${theme.colors.white};
    }

    
`;
