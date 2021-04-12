import styled, { css } from "styled-components"

export const StyledBackgrounds = styled.div`
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    scrollbar-color: #8e8e8e white;
    padding-bottom: 12px;
`;

export const BackgroundItem = styled.button`
    margin-right: 28px;
    height: 163px;
    border: none;
    background-color: transparent;
    padding: 0;

    & > p {
        margin: 14px;
        display: flex;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #000;
    }

    ${({ selected, noHover }: { selected: boolean; noHover?: boolean }) => css`
        ${!noHover ? `
            &:hover > figure {
                opacity: 1;
                transform: scale(1);
            }
        
            &:active > figure {
                opacity: 1;
                transform: scale(0.75);
            }
        ` : ``}
    
        ${selected ? `
            & > figure {
                opacity: 1;
                transform: scale(1);
            }
        ` : ``}
    `};
`;

export const BackgroundImage = styled.picture`
    width: 182px;
    height: 118px;
    display: flex;
    border-radius: 4px;

    ${({ src }: { src: any }) => css`
        background-image: url(${src});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    `};
`;

export const BackgroundSelected = styled.figure`
    width: 36px;
    height: 36px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.35);

    transition: 0.2s opacity, 0.2s transform;

    opacity: 0;
    transform: scale(0);

    display: flex;
    position: relative;
    top: -70px;
    left: 160px;
    right: 0;
    border-radius: 1000px;
    justify-content: center;
    align-items: center;

    &:before {
        content: "";
        width: 18px;
        height: 18px;
        mask-image: url(${require("../../assets/check.svg")});
        mask-size: 18px;
        mask-repeat: no-repeat;
        mask-position: center;
        background-color: #256EF5;
    }
`;