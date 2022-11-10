import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationDetails from '../Location/LocationDetails';
import LocationModal from '../Location/LocationModal';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../store/locationSlice';
import { setShowModal } from '../store/ui-slice';

const Map = ({ coords, setCoords,  }) => {
  const dispatch = useDispatch();
const complaints=useSelector(state=>state.complaint.complaints)
  const showModal = useSelector((state) => state.ui.showModal);

  const clickHandler = (e) => {
    dispatch(
      setLocation({
        lng: e.lng,
        lat: e.lat,
      })
    );

    dispatch(setShowModal());
  };
  return (
    <div className='w-full h-screen'>
      {/* google map */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={16}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
        }}
        onClick={clickHandler}
      >
        {complaints.length > 0 &&
          complaints.map((complaint, i) => (
            <div
              key={i}
              lat={Number(complaint.location.coordinates[1])}
              lng={Number(complaint.location.coordinates[0])}
              className='z-20'
            >
              {/* marker */}
              <LocationDetails complaint={complaint} />
            </div>
          ))}
        {/* modal will open after clicking marker */}
        {showModal && <LocationModal />}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
