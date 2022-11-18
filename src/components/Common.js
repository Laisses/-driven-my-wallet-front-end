import styled from "styled-components";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export const PurpleContainer = styled.div`
    height: 100vh;
    background-color: #8C11BE;
    padding-left: 24px;
    padding-right: 24px;
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 28px;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const TextInput = styled.input`
    width: 326px;
    height: 46px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    padding-left: 15px;
    margin-bottom: 16px;
    background-color: #ffffff;
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: #edeef2;
    }
`;

export const TextLabel = styled.label`
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 10px;
`;

export const ConfirmationButton = styled.button`
    width: 326px;
    height: 42px;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin-top: 6px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
`;

export const ContainerLink = styled(Link)`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: #ffffff;
    margin-top: 32px;
`;

export const Loading = () => {
    return (
        <Loader>
            <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="36"
                visible={true}
            />
        </Loader>
    );
};

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 42px;
    margin-top: 6px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
`;