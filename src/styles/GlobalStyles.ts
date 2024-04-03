import { createGlobalStyle } from "styled-components";
import theme from "./theme";
export const GlobalStyles = createGlobalStyle`
   @font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

     a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 16px;
        vertical-align: baseline;
        font-family: 'S-CoreDream-3Light';
        line-height: 1.5;
        color: ${theme.colors.white};
    }
    body{
        line-height: 1;
        font-family: 'S-CoreDream-3Light', sans-serif;
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
