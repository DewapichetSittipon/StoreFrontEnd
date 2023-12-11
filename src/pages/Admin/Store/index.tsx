import { Col, Row, Button, Card } from 'react-bootstrap';
import { Input, Loading } from '../../../components';
import { FaSearch, FaPlusCircle, FaRegEye, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { backofficeStoreService } from '../../../services';
import { useEffect, useState, useContext } from 'react';
import { StoreListResponseModel } from '../../../models';
import { HttpStatusCode } from 'axios';
import { getFileImage } from '../../../utils';
import { PageBaseContext } from '../../PageBase';
import toast from '../../../utils/toast';
import ModalStore from './StoreModal';

export default function Store() {
  const [page] = useState(1);
  const [size] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [storeList, setStoreList] = useState<StoreListResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [storeId, setStoreId] = useState<string>();
  const { showLoading, setShowLoading } = useContext(PageBaseContext);

  useEffect(() => {
    getStoreListAsync();
  }, [page, size]);

  const getStoreListAsync = async (newKeyWord?: string) => {
    setShowLoading(true);

    const { data, status } = await backofficeStoreService.getStoreListAsync(page, size, newKeyWord ?? keyword);

    if (status === HttpStatusCode.Ok) {
      setStoreList(data.data);

      setShowLoading(false);
    }
  };

  const deleteStoreAsync = async (id: string) => {
    setShowLoading(true);

    const { status } = await backofficeStoreService.deleteStoreAsync(id);

    if (status === HttpStatusCode.NoContent) {
      toast.success('ลบข้อมูลสำเร็จ');

      await getStoreListAsync();

      setShowLoading(false);
    }
  };

  const onClearCriteriaSearch = async () => {
    setKeyword('');

    await getStoreListAsync('');
  };

  const onOpenModal = (id?: string) => {
    setShowModal(true);
    setStoreId(id);
  };

  const onHideModal = async (onCreateUpdate: boolean) => {
    setShowModal(false);

    if (onCreateUpdate) {
      await getStoreListAsync();
    }
  };

  return (
    <div className="mx-5 mt-5">
      <Loading show={showLoading} />
      <Row className='d-flex justify-content-end'>
        <Col md="4">
          <div className='d-flex align-items-center'>
            <Input name='searchStore' placeholder='search' value={keyword} onChange={(value) => setKeyword(value)} />
            <FaSearch className="mx-3 cursor-pointer text-primary" size="20" onClick={() => getStoreListAsync()} />
            <AiOutlineClear className="cursor-pointer text-danger" size="24" onClick={onClearCriteriaSearch} />
          </div>
        </Col>
      </Row >
      <Row>
        <Col md="12" className='d-flex justify-content-end mt-3'>
          <Button variant='outline-dark' onClick={() => onOpenModal()}>
            <FaPlusCircle /> Create Store
          </Button>
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
                onClick={() => onOpenModal(d.id)} />
              <Card.Body>
                <Card.Title className='d-flex align-content-center justify-content-between mt-3'>
                  <h4>{d.name}</h4>
                  <div className='d-flex align-items-center'>
                    <FaRegEye /> <span className='text-info mx-3'>{d.views}</span>
                    <FaTrashAlt className="text-danger cursor-pointer" onClick={() => deleteStoreAsync(d.id)} />
                  </div>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )) : <div className='text-center'>ไม่พบข้อมูลร้านค้า</div>}
      </Row>
      <ModalStore
        show={showModal}
        id={storeId}
        onHide={(value) => onHideModal(value)}
      />
    </div >
  );
}