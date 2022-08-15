import { Header } from 'components/Header';
import { ThreeCircles } from 'react-loader-spinner';
import s from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.spinnerContainer}>
        <ThreeCircles
          className={s.spinner}
          height="100"
          width="100"
          color="#4fa94d"
          visible={true}
          ariaLabel="three-circles-rotating"
        />
      </div>
    </div>
  );
}
