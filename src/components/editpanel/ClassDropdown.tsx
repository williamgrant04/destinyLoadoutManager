const ClassDropdown = (props: { characters: Array<string> }): React.JSX.Element => {
  return (
    <>
      {props.characters.forEach((char) => {
        <div>{char}</div>
      })}
    </>
  )

}

export default ClassDropdown
