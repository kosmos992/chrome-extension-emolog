import styled, { css } from 'styled-components';

const SIZES = {
  long: css`
    --input-height: 200px;
  `,
};

const BORDER = {
  shadow: css`
    --input-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  `,
  transparent: css`
    --input-shadow: none;
  `,
};

interface InputProps {
  placeHolder?: string;
  value: any;
  size?: 'long';
  border: 'shadow' | 'transparent';
  color: string;
  name?: string;
}

const InputItem = styled.input<{ sizeStyle: string; borderStyle: string }>`
  ${props => props.sizeStyle};
  ${props => props.borderStyle};
  height: var(--input-height);
  border: none;
  padding: 4px 8px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: var(--input-shadow);
  margin: 8px 0;
  background-color: ${props => (props.color ? props.color : 'white')};
`;

const Input = ({ placeHolder, value, size, border, color }: InputProps) => {
  const sizeStyle = SIZES[size];
  const borderStyle = BORDER[border];
  return (
    <InputItem
      sizeStyle={sizeStyle}
      borderStyle={borderStyle}
      color={color}
      {...value}
      type="text"
      placeholder={placeHolder}
    />
  );
};

export default Input;
