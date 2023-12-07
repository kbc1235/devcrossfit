import { createGlobalStyle } from "styled-components";
import theme from "./theme";
export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'SUIT';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Light.woff2') format('woff2');
        font-weight: light;
    
    }
    @font-face {
        font-family: 'SUIT';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
        font-weight: normal;

    }
    @font-face {
        font-family: 'SUIT';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Bold.woff2') format('woff2');
        font-weight: bold;

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
        font-family: 'SUIT';
        line-height: 1;
    }
    body{
        line-height: 1;
        font-family: 'SUIT', sans-serif;
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
