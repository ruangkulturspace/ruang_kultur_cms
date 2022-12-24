// ini helpers khusus untuk browser jgn pake fungsi server disini
import { notification } from 'antd';
import Router from 'next/router';

export const PushNavigateTo = async (routes) => {
    console.log('%c Navigating To : ' + routes, 'background: #222; color: #bada55');
    Router.push(routes);
}

export const ReplaceNavigateTo = async (routes) => {
    console.log('%c Navigating To : ' + routes, 'background: #222; color: #bada55');
    Router.replace(routes);
}


export const showError = (status, message) => {
    notification["error"]({
        message: status,
        description: message ?? "getting data failed",
    });
}

export const showSuccess = (status, message) => {
    notification["success"]({
        message: status,
        description: message ?? "getting data success",
    });
}