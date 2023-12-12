import { Modal } from "../../../components";
import { Image } from 'react-bootstrap';
import { PageBaseContext } from "../../PageBase";
import { useContext, useEffect, useState } from "react";
import { StoreListResponseModel } from "../../../models";
import { storeService } from "../../../services";
import { HttpStatusCode } from "axios";
import { getFileImage } from "../../../utils";
import GoogleMap from "../../../components/GoogleMap";
import { FaTimes } from "react-icons/fa";

interface Props {
  id: string,
  show: boolean,
  onHide: () => void,
}

export default function ModalUserStore(props: Props) {
  const [storeDetail, setStoreDetail] = useState<StoreListResponseModel>({
    latitude: '13.7247376',
    longitude: '100.3212781'
  } as StoreListResponseModel);
  const { setShowLoading } = useContext(PageBaseContext);

  useEffect(() => {
    if (props.show && props.id) {
      getDetailAsync(props.id);
    }
  }, [props.show, props.id]);

  const getDetailAsync = async (id: string) => {
    setShowLoading(true);

    const { data, status } = await storeService.getStoreDetailAsync(id);

    if (status === HttpStatusCode.Ok) {
      setStoreDetail(data);
    }

    setShowLoading(false);
  };

  return (
    <>
      <Modal show={props.show} onHide={() => { }}>
        <div className="d-flex justify-content-between">
          <label>รูป Banner</label>
          <FaTimes className="cursor-pointer" onClick={() => props.onHide()} />
        </div>
        <div style={{ height: "250px" }} className="mb-3">
          <Image src={getFileImage(storeDetail.banner)} style={{ width: '100%', height: '250px' }} />
        </div>
        <h4>ชื่อร้านค้า: {storeDetail.name}</h4>
        <h4>รายละเอียดร้านค้า: {storeDetail.description}</h4>
        <div className="mt-5">
          <GoogleMap
            lat={parseFloat(storeDetail.latitude)}
            lng={parseFloat(storeDetail.longitude)}
            name={storeDetail.name} />
        </div>
      </Modal >
    </>
  )
}