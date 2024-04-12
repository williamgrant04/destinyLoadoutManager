import styled from "styled-components"

const LoadoutButton = (props) => {
  return (
    <StyledLoadoutButton>
      <img src="requestbungieapifortheimage" alt={props.image} />
    </StyledLoadoutButton>
  )
}

const StyledLoadoutButton = styled.button`
  width: 65px;
  height: 65px;
  border: none;
`

export default LoadoutButton
