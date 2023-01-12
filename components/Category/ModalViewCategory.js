import { Modal, Row, Col } from 'antd';
import { useAppState } from '../shared/AppProvider';

const ModalViewCategory = ({ modalView, setModalView, dataView }) => {
    const [state, dispatch] = useAppState();

    return (
        <>
            <Modal
                visible={modalView}
                onOk={() => {
                    setModalView(false);
                }}
                onCancel={() => {
                    setModalView(false);
                }}
                width={'350px'}
                title={null}
                footer={null}
                centered={true}
            >
                <Row gutter={[10, 10]} justify="center" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <h1 className="text-center headerPage" style={{ fontSize: '14px' }}>
                            Data
                        </h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>

                <Col xs={24} sm={24} md={24} lg={24}>
                    <h1 className="text-center headerPage" style={{ fontSize: '14px' }}>
                        Nama
                    </h1>
                    <p style={{ margin: 0 }} className="text-center">
                        {dataView?.name}
                    </p>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <h1 className="text-center headerPage" style={{ fontSize: '14px' }}>
                        Deskripsi
                    </h1>
                    <p style={{ margin: 0 }} className="text-center">
                        {dataView?.description}
                    </p>
                </Col>

            </Modal>
        </>
    )
}

export default ModalViewCategory;
