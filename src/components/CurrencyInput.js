import styled from "styled-components";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import React from "react";


export const CurrencyInput = () => {
    const defaultMaskOptions = {
        prefix: 'R$',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        decimalLimit: 2,
        integerLimit: 9,
        allowNegative: false,
        allowLeadingZeroes: false,
    }

    const CurrencyInput = ({ maskOptions, ...inputProps }) => {
        const currencyMask = createNumberMask({
            ...defaultMaskOptions,
            ...maskOptions,
        })

        return <MaskedInput
            mask={currencyMask}
            render={(ref, props) => <Input ref={ref} {...props} />}
            {...inputProps}
        />
    }

    CurrencyInput.defaultProps = {
        inputMode: 'numeric',
        maskOptions: {},
    }

    CurrencyInput.propTypes = {
        inputmode: PropTypes.string,
        maskOptions: PropTypes.shape({
            prefix: PropTypes.string,
            suffix: PropTypes.string,
            includeThousandsSeparator: PropTypes.bool,
            thousandsSeparatorSymbol: PropTypes.string,
            allowDecimal: PropTypes.bool,
            decimalSymbol: PropTypes.string,
            decimalLimit: PropTypes.string,
            requireDecimal: PropTypes.bool,
            allowNegative: PropTypes.bool,
            allowLeadingZeroes: PropTypes.bool,
            integerLimit: PropTypes.number,
        }),
    }

    return (
        <Container>
            <CurrencyInput />
        </Container>

    );
};

const Container = styled.div`
    background-color: #8C11BE;
    height: 100vh;
`;


const Input = styled.input`
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