import styled from "styled-components"

const EditPanel = (): React.JSX.Element => {
  return (
    <EditBackdrop>

    </EditBackdrop>
  )
}

const EditBackdrop = styled.div`
  border-left: 1px solid grey;
  background-color: rgb(219, 219, 219);
  position: fixed;
  right: 0;
  height: 100vh;
  width: 60vw;
`

export default EditPanel
