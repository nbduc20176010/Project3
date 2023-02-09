import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Space,
} from "antd";
import React, { useEffect, useState } from "react";
import {
    addProduct,
    editProductDetail,
    resetCurrentDetail,
    resetDetailStatus,
} from "../../store/features/adminSlice";
import { triggerEditModal } from "../../store/features/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const { Option } = Select;
const layout = {
    labelCol: { offset: 0, span: 7 },
    wrapperCol: { span: 17 },
};

const ProductModal = () => {
    const modalVisible = useAppSelector(
        (state) => state.common.editModalVisible
    );
    const functionLoading = useAppSelector((state) => state.admin.status);
    const loadingStatus = useAppSelector((state) => state.admin.detailStatus);
    const productDetail = useAppSelector((state) => state.admin.detail);
    const [form] = Form.useForm();
    const [uploadImage, setUploadImage] = useState<any>({});

    const dispatch = useAppDispatch();

    const hideModal = () => {
        dispatch(triggerEditModal({ modalStatus: false }));
        form.resetFields();
        dispatch(resetCurrentDetail());
    };

    const onSubmitForm = (values: any) => {
        let formData = new FormData();
        formData.append("image", uploadImage);
        formData.append("img", "text");
        Object.keys(values).forEach((key) => {
            if (typeof values[key] !== "object")
                formData.append(key, values[key]);
            else formData.append(key, JSON.stringify(values[key]));
        });
        console.log(uploadImage);

        if (productDetail._id) {
            dispatch(
                editProductDetail({ _id: productDetail._id, values: formData })
            );
        } else {
            dispatch(addProduct(formData));
        }
        hideModal();
    };

    const uploadingImage = (event: any) => {
        event.target.files[0] && setUploadImage(event.target.files[0]);
    };

    useEffect(() => {
        if (loadingStatus === "finish") {
            dispatch(triggerEditModal({ modalStatus: true }));
            dispatch(resetDetailStatus());
        }
        modalVisible && form.setFieldsValue(productDetail);
    }, [form, loadingStatus, dispatch, productDetail, modalVisible]);

    return (
        <>
            <Modal
                title="Product management"
                open={modalVisible}
                onCancel={hideModal}
                width={450}
                footer={null}
            >
                <Form
                    form={form}
                    {...layout}
                    labelAlign="left"
                    onFinish={onSubmitForm}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <input
                        multiple={false}
                        type="file"
                        onChange={uploadingImage}
                    />
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[{ required: true }]}
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Select>
                                    <Option value="Game">Game</Option>
                                    <Option value="Gift coupon">
                                        Gift coupon
                                    </Option>
                                    <Option value="Card">Card</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[{ required: true }]}
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true }]}
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="currency"
                                label="Currency"
                                rules={[{ required: true }]}
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Select>
                                    <Option value="$">Dollar</Option>
                                    <Option value="VND">VND</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        style={{
                            marginBottom: 0,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Space size="small">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={functionLoading === "loading"}
                            >
                                Submit
                            </Button>
                            <Button onClick={hideModal}>Cancel</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProductModal;
