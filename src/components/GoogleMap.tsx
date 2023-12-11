import GoogleMapReact from 'google-map-react';
import { FaLocationDot } from 'react-icons/fa6';

interface Props {
  lat: number;
  lng: number;
  name: string;
}

export default function GoogleMap(props: Props) {
  const baseApiGG = import.meta.env.VITE_APP_API_GG;

  const AnyReactComponent = ({ text }: any) => <div>
    <div>
      <FaLocationDot className="text-danger" size="24" />
      <h5 className='text-center text-inline'>{text}</h5>
    </div>
  </div>;

  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
    zoom: 11
  };

  return (
    <>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: baseApiGG }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={props.lat}
            lng={props.lng}
            text={props.name}
          />
        </GoogleMapReact>
      </div>
    </>
  );
}