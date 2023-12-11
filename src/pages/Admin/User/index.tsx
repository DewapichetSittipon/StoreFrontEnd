import { Button, Col, Row } from "react-bootstrap";
import { Input, Loading } from "../../../components";
import { FaPlusCircle, FaSearch, FaTrashAlt, FaUserAlt } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserListResponseModel } from "../../../models";
import { backofficeUserService } from "../../../services";
import { HttpStatusCode } from "axios";
import { PageBaseContext } from "../../PageBase";
import UserModal from "./UserModal";
import toast from "../../../utils/toast";

export default function User() {
  const [page] = useState(1);
  const [size] = useState(10);
  const [keyword, setKeyword] = useState<string>();
  const [userList, setUserList] = useState<UserListResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string>();
  const { showLoading, setShowLoading } = useContext(PageBaseContext);

  useEffect(() => {
    getUserListAsync();
  }, [page, size]);

  const getUserListAsync = async (keywordSerch?: string) => {
    setShowLoading(true);

    const { data, status } = await backofficeUserService.getUserListAsync(page, size, keywordSerch ?? keyword);

    if (status === HttpStatusCode.Ok) {
      setUserList(data.data);
    }

    setShowLoading(false);
  };

  const onOpenModal = (id?: string) => {
    setShowModal(true);
    setUserId(id);
  };

  const onHideModal = async (onCreateUpdate: boolean) => {
    setShowModal(false);

    if (onCreateUpdate) {
      await getUserListAsync();
    }
  };

  const deleteUserAsync = async (id: string) => {
    setShowLoading(true);

    const { status } = await backofficeUserService.deleteUserAsync(id);

    if (status === HttpStatusCode.NoContent) {
      toast.success('ลบข้อมูลสำเร็จ');

      await getUserListAsync();

      setShowLoading(false);
    }
  };

  const onClearCriteriaSearch = async () => {
    setKeyword('');

    await getUserListAsync('');
  };

  return (
    <div className="mx-5 mt-5">
      <Loading show={showLoading} />
      <Row className='d-flex justify-content-end'>
        <Col md="4">
          <div className='d-flex align-items-center'>
            <Input name='searchStore' placeholder='search' value={keyword} onChange={(value) => setKeyword(value)} />
            <FaSearch className="mx-3 cursor-pointer text-primary" size="20" onClick={() => getUserListAsync()} />
            <AiOutlineClear className="cursor-pointer text-danger" size="24" onClick={onClearCriteriaSearch} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12" className='d-flex justify-content-end mt-3'>
          <Button variant='outline-dark' onClick={() => onOpenModal()}>
            <FaPlusCircle /> Create User
          </Button>
        </Col>
      </Row>
      <Row className='mt-3'>
        {userList?.length > 0 ? userList?.map(d => (
          <Col sm="6" md="6" lg="4" xl="3" xxl="2" className='mt-3' key={d.id}>
            <div className="text-center" onClick={() => onOpenModal(d.id)}>
              <FaUserAlt size="40" />
            </div>
            <div className="d-flex align-items-center gap-2 justify-content-center">
              <p className="mt-3">{d.firstName} {d.lastName}</p>
              <FaTrashAlt className="text-danger cursor-pointer" onClick={() => deleteUserAsync(d.id)} />
            </div>
            <p className="text-center">({d.role})</p>
          </Col>
        )) : <div className='text-center'>ไม่พบข้อมูลผู้ใช้งาน</div>}
      </Row>
      <UserModal
        show={showModal}
        onHide={(value) => onHideModal(value)}
        id={userId} />
    </div>
  );
}