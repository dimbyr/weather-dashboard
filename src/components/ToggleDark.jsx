export default function ToggleDark(darkData){
  
  return (
    <>
    <svg width="50" height="50" viewBox="0 0 96 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="8" width="70" height="32" rx="16" fill={darkData.fill}/>
          <rect x={darkData.xposition} y="12" width="24" height="24" rx="12" fill={darkData.color}/>
    </svg>
    </>
  )
}