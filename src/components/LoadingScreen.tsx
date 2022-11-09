import { BallTriangle } from 'react-loader-spinner'
import Lottie, { useLottie } from "lottie-react";
import la8g9sbk from '../assets/animations/animation_la8g9sbk.json';
import la8ga6dh from '../assets/animations/animation_la8ga6dh.json';
import la8gahyo from '../assets/animations/animation_la8gahyo.json';
const LoadingScreen = () => {

  const style = {
    height: 100,
    width: 100,
    margin: 'auto',
    marginRight: 'auto'
  };
  const options = {
    animationData: la8ga6dh,
    loop: true,
  };

  const { View } = useLottie(options, style);
  return (
    <div className="tw-w-full tw-h-full tw-fixed tw-top-0 tw-left-0 tw-bg-white tw-opacity-75 tw-z-50 tw-flex">
      {/* <BallTriangle
        wrapperClass="tw-m-auto"
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      /> */}
      {View}
    </div>

  )
}

export default LoadingScreen;