import { Button, Form, Input, message, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    resetAuthStatus,
    signInUser,
    signUpUser,
} from "../../store/features/authSlice";
import { triggerLoginModal } from "../../store/features/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import "./index.scss";

const Login: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    //switch between login adn signup form
    const [formTrigger, setformTrigger] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const modalVisible = useAppSelector(
        (state) => state.common.loginModalVisible
    );

    const authStatus = useAppSelector((state) => state.auth.status);
    const authMessage = useAppSelector((state) => state.auth.authMessage);

    const closeLoginModal = () => {
        dispatch(triggerLoginModal({ modalStatus: false }));
        form.resetFields();
    };

    const handleLogin = (values: any) => {
        dispatch(signInUser(values));
    };

    const handleRegister = (values: any) => {
        dispatch(signUpUser(values));
    };

    const triggerResetAuthStatus = () => {
        authStatus !== "standby" && dispatch(resetAuthStatus());
    };

    useEffect(() => {
        if (authStatus === "finish") {
            messageApi.open({
                type: "success",
                content: authMessage,
                duration: 1,
            });
            closeLoginModal();
        }
        authStatus === "finish" && dispatch(resetAuthStatus());
    }, [authStatus, dispatch, messageApi, authMessage]);

    const LoginForm = () => (
        <Form
            form={form}
            onFinish={handleLogin}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign="left"
            labelWrap
        >
            <Form.Item
                label={t("content.form.username")}
                name="username"
                rules={[
                    {
                        required: true,
                        message: `${t("content.message.username_required")}`,
                    },
                ]}
            >
                <Input placeholder={t("content.form.username")} />
            </Form.Item>
            <Form.Item
                label={t("content.form.password")}
                name="password"
                rules={[
                    {
                        required: true,
                        message: `${t("content.message.password_required")}`,
                    },
                ]}
                style={{ marginBottom: "0" }}
            >
                <Input.Password placeholder={t("content.form.password")} />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {authStatus === "failed" && (
                    <span id="small_error_msg">{authMessage}</span>
                )}
            </div>
            <Form.Item style={{ marginBottom: "0" }}>
                <span
                    className="switch_form_trigger"
                    onClick={() => setformTrigger(false)}
                >
                    {t("content.message.register_new_account")}
                </span>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
                <Space className="form_btn_container" size={16}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={authStatus === "loading" ? true : false}
                    >
                        {t("content.login")}
                    </Button>
                    <Button onClick={closeLoginModal}>
                        {t("content.form.cancel_btn")}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    const SignupForm = () => (
        <Form
            form={form}
            onFinish={handleRegister}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign="left"
            labelWrap
        >
            <Form.Item
                label={t("content.form.username")}
                name="username"
                rules={[
                    {
                        required: true,
                        message: `${t("content.message.username_required")}`,
                    },
                ]}
            >
                <Input
                    onClick={triggerResetAuthStatus}
                    placeholder={t("content.form.username")}
                />
            </Form.Item>
            <Form.Item
                label={t("content.form.password")}
                name="password"
                rules={[
                    {
                        required: true,
                        message: `${t("content.message.password_required")}`,
                    },
                ]}
            >
                <Input.Password placeholder={t("content.form.password")} />
            </Form.Item>
            <Form.Item
                label={t("content.form.email")}
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: `${t("content.message.email_validation")}`,
                    },
                ]}
                style={{ marginBottom: "0" }}
            >
                <Input placeholder={t("content.form.email")} />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {authStatus === "finish" ? (
                    <span id="small_success_msg">{authMessage}</span>
                ) : (
                    authStatus === "failed" && (
                        <span id="small_error_msg">{authMessage}</span>
                    )
                )}
            </div>
            <Form.Item style={{ marginBottom: "0" }}>
                <span
                    className="switch_form_trigger"
                    onClick={() => setformTrigger(true)}
                >
                    {t("content.message.already_have_account")}
                </span>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
                <Space className="form_btn_container" size={16}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={authStatus === "loading" ? true : false}
                    >
                        {t("content.form.submit_btn")}
                    </Button>
                    <Button onClick={closeLoginModal}>
                        {t("content.form.cancel_btn")}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    return (
        <>
            {contextHolder}
            <Modal
                title={t("content.login")}
                open={modalVisible}
                footer={null}
                width={400}
                onCancel={closeLoginModal}
                getContainer={false}
            >
                {formTrigger ? <LoginForm /> : <SignupForm />}
            </Modal>
        </>
    );
};

export default Login;
