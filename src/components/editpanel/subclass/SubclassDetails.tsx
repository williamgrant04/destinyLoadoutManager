import styled from "styled-components";

interface SubclassDetailsProps {
  subclassDisplay: { [key: string]: any };
}

const SubclassDetails = ({ subclassDisplay }: SubclassDetailsProps): React.JSX.Element => {
  return (
    <SubclassBackground $backgroundImage={`https://bungie.net${subclassDisplay.screenshot}`}>
      <img src={`https://bungie.net${subclassDisplay.icon}`} alt="" />
      <Details>
        <h1>{subclassDisplay.name}</h1>
        <hr />
        <em>Subclass</em>
      </Details>
    </SubclassBackground>
  )
}

const SubclassBackground = styled.div<{ $backgroundImage: string }>`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px 70%;
  display: flex;
  color: white;
  align-items: center;
  padding: 10px 15px;

  h1 {
    margin: 0;
    margin-top: -22px; // Align the hr to center
  }
`

const Details = styled.div`
  height: 100%;
  width: 100%;
`

export default SubclassDetails
