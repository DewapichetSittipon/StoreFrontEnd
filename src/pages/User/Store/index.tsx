import { Card, Col, Row } from "react-bootstrap";
import { Input } from "../../../components";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { getFileImage } from "../../../utils";
import { PageBaseContext } from "../../PageBase";
import { useContext, useEffect, useState } from "react";
import { StoreListResponseModel } from "../../../models";
import { storeService } from "../../../services";
import { HttpStatusCode } from "axios";
import ModalUserStore from "./ModalUserStore";

export default function UserStore() {
  const [page] = useState(1);
  const [size] = useState(10);
  const [keyword, setKeyword] = useState<string>("");
  const [storeList, setStoreList] = useState<StoreListResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [storeId, setStoreId] = useState<string>("");
  const { setShowLoading } = useContext(PageBaseContext);

  useEffect(() => {
    getStoreListAsync();
  }, [page, size]);

  const getStoreListAsync = async (newKeyWord?: string) => {
    setShowLoading(true);

    const { data, status } = await storeService.getStoreListAsync(page, size, newKeyWord ?? keyword);

    if (status === HttpStatusCode.Ok) {
      setStoreList(data.data);

      setShowLoading(false);
    }
  };

  const onClearCriteriaSearch = async () => {
    setKeyword('');

    await getStoreListAsync('');
  };

  const onOpenModal = (id: string) => {
    setShowModal(true);
    setStoreId(id);
  };

  return (
    <div className="mx-5 mt-5">
      <Row className='d-flex justify-content-end'>
        <Col md="4">
          <div className='d-flex align-items-center'>
            <Input name='searchStore' placeholder='search' value={keyword} onChange={(value) => setKeyword(value)} />
            <FaSearch className="mx-3 cursor-pointer text-primary" size="20" onClick={() => getStoreListAsync()} />
            <AiOutlineClear className="cursor-pointer text-danger" size="24" onClick={onClearCriteriaSearch} />
          </div>
        </Col>
      </Row>
      <Row className='mt-3'>
        {storeList?.length > 0 ? storeList?.map(d => (
          <Col sm="6" md="6" lg="4" xl="3" xxl="2" className='mt-3' key={d.name}>
            <Card>
              <Card.Img
                className='cursor-pointer'
                variant="top"
                src={getFileImage(d.banner)}
                height={220}
                onClick={() => onOpenModal(d.id)}
              />
              <Card.Body>
                <Card.Title className='d-flex align-content-center justify-content-between mt-3'>
                  <h4>{d.name}</h4>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )) : <div className='text-center'>ไม่พบข้อมูลร้านค้า</div>}
      </Row>
      <ModalUserStore
        show={showModal}
        id={storeId}
        onHide={() => setShowModal(false)}
      />
    </div >
  )
}