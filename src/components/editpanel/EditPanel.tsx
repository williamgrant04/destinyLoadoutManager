import styled from "styled-components"
import ClassSelector from "./ClassSelector"
import SubclassSelector from "./subclass/SubclassSelector"

const EditPanel = (): React.JSX.Element => {
  return (
    <EditBackdrop>
      <SubclassSelector/>
      <ClassSelector/>
    </EditBackdrop>
  )
}

const EditBackdrop = styled.div`
  overflow-y: scroll;
  border-left: 1px solid grey;
  background-color: rgb(219, 219, 219);
  position: fixed;
  right: 0;
  height: 100vh;
  width: 60vw;
`

export default EditPanel
