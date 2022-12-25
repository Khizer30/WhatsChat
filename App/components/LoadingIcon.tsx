import Image from "next/image" ;
// ...
import img from "images/loading.svg" ;

// Loading Icon
function LoadingIcon(): JSX.Element
{
  return (
  <>
    <div className="container-fluid d-flex justify-content-center align-items-center loadingDiv">
      <Image
        src={ img }
        alt="Loading Icon"
        draggable="false"
        placeholder="empty"
        priority
        className="loadingImg"
      />
    </div>
  </>
  )
}

// Export Loading Icon
export default LoadingIcon ;