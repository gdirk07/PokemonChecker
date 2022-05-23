

type barProps = {
  max: number;
  value: number;
  color: string;
}
export const GenerateBar = (props: barProps) => {
  const { max, value, color='#fff'} = props;
  const ratio = value/max * 100;
  const fill = (ratio > 100) ? 100 : ratio;
  const containerStyles = {
    height: 10,
    overflow: 'auto',
  }

  const fillerStyles = {
    height: '100%',
    width: `${fill}%`,
    backgroundColor: color
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  )
}

export default GenerateBar;