import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const GridForm = styled.form`
  width: 70%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
`

export const ColOne = styled.label`
  grid-column: 1;
`

export const ColTwoText = styled.input`
  grid-column: 2;
`

export const ColTwoField = styled.fieldset`
  grid-column: 2;
  border: none;
  display: flex;
  flex-wrap: wrap;
`

export const Button = styled.button<{ $btnColor?: string }>`
  background-color: var(--${(props) => props.$btnColor});
  color: var(
    --${(props) => {
        if (props.$btnColor == 'cream') {
          return 'midnight'
        } else if (props.$btnColor == 'olive') {
          return 'black'
        } else {
          return 'cream'
        }
      }}
  );
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
  grid-column: 2;
  width: 50%;
`

export const ErrorMessage = styled.div`
  color: var(--berry);
  cursor: pointer;
`
interface Props {
  selected: string
}
export const RadioLabel = styled.label`
  padding: 5px;
  ${(props: Props) =>
    props.selected &&
    `
    border-radius: 15%;
    background-color: grey;
  `}
`

export const Radio = styled.input.attrs({ type: 'radio' })`
  display: none;
`
export const HeaderStyle = styled.header`
  background-color: var(--midnight);
  color: var(--cream);
  width: 100%;
`

export const AuthGroup = styled.div`
  display: flex;
  align-items: center;
`

export const NavLink = styled(Link)`
  color: var(--cream);
  text-decoration: underline;
`

export const NavButton = styled.button<{ $btnColor?: string }>`
  background-color: var(--${(props) => props.$btnColor});
  color: var(
    --${(props) => {
        if (props.$btnColor == 'cream') {
          return 'midnight'
        } else if (props.$btnColor == 'olive') {
          return 'black'
        } else {
          return 'cream'
        }
      }}
  );
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
`
