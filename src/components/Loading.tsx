import { Oval } from 'react-loader-spinner';

interface Props {
  show: boolean;
  style?: string;
}

export function Loading(props: Props) {
  return (
    props.show ?
      <div className={`loading ${props.style}`}>
        <div className='spinner'>
          <Oval
            height="125"
            width="125"
            color="black"
            secondaryColor='transparent' />
        </div>
        <div className='back-drop' />
      </div> :
      <></>
  )
};