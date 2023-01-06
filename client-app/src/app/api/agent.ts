import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { PaginatedResult } from '../models/pagination';
import { QAReview } from '../models/qaReview';
import { Report } from '../models/report';
import { User, UserDetail, UserLogin } from '../models/user';
import { WorkOrder, WorkOrderFormValues } from '../models/workOrder';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config }: any = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    modalStateErrors.push(data.errors[key]);
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const WorkOrders = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<WorkOrder[]>>('workOrders', { params }).then(responseBody),
    listSaved: () => axios.get<WorkOrder[]>('workOrders/saved'),
    details: (id: string) => requests.get<WorkOrder>(`workOrders/${id}`),
    create: (workOrder: WorkOrderFormValues) => requests.post<void>('workOrders', workOrder),
    update: (workOrder: WorkOrderFormValues) => requests.put<void>(`workOrders/${workOrder.id}`, workOrder),
    reconfigure: (workOrder: WorkOrder) => requests.put<void>(`workOrders/reconfigure/${workOrder.id}`, workOrder),
    delete: (id: string) => requests.delete<void>(`workOrders/${id}`),
    report: (reportName: string) => requests.get<Report[]>(`workOrders/report?reportName=${reportName}`),
    uploadWorkOrders: (file: File) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<void>('workOrders/upload', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    }
}

const QA = {
    list: (params: URLSearchParams) => axios.get<WorkOrder[]>('qa', { params }),
    review: (review: QAReview) => {
        let formData = new FormData();
        formData.append('id', review.id);
        formData.append('job', review.job.toString());
        formData.append('auditorName', review.auditorName);
        formData.append('dateOfAudit', review.dateOfAudit!.toISOString());
        formData.append('prodLine', review.prodLine);
        formData.append('assembly', review.assembly);
        formData.append('deviceSerialNumber', review.deviceSerialNumber);
        formData.append('globalRework', String(review.globalRework));
        formData.append('grNumber', review.grNumber);
        formData.append('omsAvailable', String(review.omsAvailable));
        formData.append('correctToolAvailableAndCalibrated', String(review.correctToolAvailableAndCalibrated));
        formData.append('zebraTestUtilityAvailable', String(review.zebraTestUtilityAvailable));
        formData.append('snAllTestsPass', String(review.snAllTestsPass));
        formData.append('testUtilityUnitLabelBoxLabel', String(review.testUtilityUnitLabelBoxLabel));
        formData.append('shift', review.shift);
        formData.append('followedESDRequirement', String(review.followedESDRequirement));
        formData.append('faiCompletedWithPass', String(review.faiCompletedWithPass));
        formData.append('qualityOfLabel', String(review.qualityOfLabel));
        formData.append('faiAndLAIEvidence', review.faiAndLAIEvidence);
        formData.append('pictureOfUnitAndPODLabel', review.pictureOfUnitAndPODLabel);
        formData.append('packingPicture', review.packingPicture);
        formData.append('issueDocumented', String(review.issueDocumented));
        formData.append('packingProcess', String(review.packingProcess));
        formData.append('issueDescription', review.issueDescription);
        formData.append('evidenceOfIssuesReported', review.evidenceOfIssuesReported);
        formData.append('verificationStatus', review.verificationStatus);
        return axios.post<void>('qa', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    update: (review: QAReview) => {
        let formData = new FormData();
        formData.append('id', review.id);
        formData.append('job', review.job.toString());
        formData.append('auditorName', review.auditorName);
        formData.append('dateOfAudit', review.dateOfAudit!.toISOString());
        formData.append('prodLine', review.prodLine);
        formData.append('assembly', review.assembly);
        formData.append('deviceSerialNumber', review.deviceSerialNumber);
        formData.append('globalRework', String(review.globalRework));
        formData.append('grNumber', review.grNumber);
        formData.append('omsAvailable', String(review.omsAvailable));
        formData.append('correctToolAvailableAndCalibrated', String(review.correctToolAvailableAndCalibrated));
        formData.append('zebraTestUtilityAvailable', String(review.zebraTestUtilityAvailable));
        formData.append('snAllTestsPass', String(review.snAllTestsPass));
        formData.append('testUtilityUnitLabelBoxLabel', String(review.testUtilityUnitLabelBoxLabel));
        formData.append('shift', review.shift);
        formData.append('followedESDRequirement', String(review.followedESDRequirement));
        formData.append('faiCompletedWithPass', String(review.faiCompletedWithPass));
        formData.append('qualityOfLabel', String(review.qualityOfLabel));
        formData.append('faiAndLAIEvidence', review.faiAndLAIEvidence);
        formData.append('pictureOfUnitAndPODLabel', review.pictureOfUnitAndPODLabel);
        formData.append('packingPicture', review.packingPicture);
        formData.append('issueDocumented', String(review.issueDocumented));
        formData.append('packingProcess', String(review.packingProcess));
        formData.append('issueDescription', review.issueDescription);
        formData.append('evidenceOfIssuesReported', review.evidenceOfIssuesReported);
        formData.append('verificationStatus', review.verificationStatus);
        return axios.put<void>(`qa/${review.id}`, formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    details: (id: string) => requests.get<QAReview>(`qa/${id}`)
}

const Account = {
    current: () => requests.get<User>('account'),
    login: (user: UserLogin) => requests.post<User>('account/login', user),
    create: (user: UserDetail) => requests.post<void>('users', user),
    update: (user: UserDetail) => requests.put<void>(`users/${user.userName}`, user),
    delete: (userName: string) => requests.delete<void>(`users/${userName}`),
    list: (searchKey: string) => requests.get<UserDetail[]>(`users?searchKey=${searchKey}`),
    details: (userName: string) => requests.get<UserDetail>(`users/${userName}`)
}

const agent = {
    WorkOrders,
    Account,
    QA
}

export default agent;