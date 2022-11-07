import { BallTriangle } from 'react-loader-spinner'

const LoadingScreen = () => {
  console.log('kind')
  return (
    <div className="tw-w-full tw-h-full tw-fixed tw-block tw-top-0 tw-left-0 tw-bg-white tw-opacity-75 tw-z-50 tw-flex">
      <BallTriangle
        wrapperClass="tw-m-auto"
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>

  )
}

export default LoadingScreen;