import { Modal, Row, Col, Button } from 'antd';
import { useState } from 'react';
import { requestDelete, showSuksesCustom } from '../../utils/baseService';
import { useAppState } from '../shared/AppProvider';

const ModalDeleteCategory = ({ session, modalDelete, setModalDelete, dataDelete, onFinish = () => {} }) => {
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const FetcherDeleteUser = async () => {
        setLoading(true);
        var datar = await requestDelete(
            session,
            process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/category/delete/' + dataDelete._id
        );
        setLoading(false);

        if (datar?.data?.statusCode < 400) {
            showSuksesCustom("Success!", datar?.message);
            onFinish();
            setModalDelete(false);
        }
    };

    const handleOkDelete = () => {
        FetcherDeleteUser();
    };

    return (
        <>
            <Modal
                visible={modalDelete}
                onOk={() => {
                    setModalDelete(false);
                }}
                onCancel={() => {
                    setModalDelete(false);
                }}
                width={'350px'}
                title={null}
                footer={[
                    <Button
                        style={{
                            color: '#33539E',
                            background: '#fff',
                            borderRadius: '4px',
                            borderColor: '#33539E',
                        }}
                        key="back"
                        onClick={() => {
                            setModalDelete(false);
                        }}
                    >
                        No
                    </Button>,
                    <Button
                        style={{
                            color: '#fff',
                            background: '#33539E',
                            borderRadius: '4px',
                        }}
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOkDelete}
                    >
                        Yes
                    </Button>,
                ]}
                centered={true}
            >
                <Row gutter={[10, 10]} justify="center" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <h1 className="text-center headerPage" style={{ fontSize: '14px' }}>
                            Delete This Category?
                        </h1>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalDeleteCategory;
