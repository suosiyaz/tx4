import { format } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { Report } from '../models/report';
import { WorkOrder, WorkOrderFormValues } from '../models/workOrder';

export default class WorkOrderStore {
    workOrderRegistery = new Map<string, WorkOrder>();
    savedWorkOrderRegistery = new Map<string, WorkOrder>();
    selectedWorkOrder: WorkOrder | undefined = undefined;
    selectedSavedWorkOrder: WorkOrder | undefined = undefined;
    workOrderToEdit: WorkOrder | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map();
    WorkOrdersReleasedDaily: Report[] = [];
    HotWorkOrdersDaily: Report[] = [];
    WorkOrdersCompleted: Report[] = [];
    WorkOrdersPastDue: Report[] = [];
    WorkOrdersInProgress: Report[] = [];
    WorkOrdersProdLine: Report[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    setWorkOrderToEdit = (workOrder: WorkOrder) => {
        this.workOrderToEdit = workOrder;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        if (value !== '' && value !== null) this.predicate.set(predicate, value);
    }

    resetParams = () => {
        this.predicate.forEach((value, key) => this.predicate.delete(key));
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'releaseDateFrom' || key === 'releaseDateTo' || key === 'completionDateFrom' || key === 'completionDateTo') {
                if (value != null) {
                    params.append(key, (value as Date).toISOString());
                } else {
                    params.append(key, '');
                }
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    get workOrders() {
        return Array.from(this.workOrderRegistery.values());
    } 

    get savedWorkOrders() {
        return Array.from(this.savedWorkOrderRegistery.values());
    } 

    loadWorkOrders = async () => {
        this.setLoadingInitial(true);
        this.workOrderRegistery.clear();
        try {
            const result = await agent.WorkOrders.list(this.axiosParams);
            result.data.forEach(workOrder => {
                this.setWorkOrder(workOrder);
            });
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadSavedWorkOrders = async () => {
        this.setLoadingInitial(true);
        this.savedWorkOrderRegistery.clear();
        try {
            const result = await agent.WorkOrders.listSaved();
            result.data.forEach(workOrder => {
                this.setSavedWorkOrder(workOrder);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadWorkOrder = async (id: string) => {
        let workOrder = this.getWorkOrder(id);
        if (workOrder) {
            this.selectedWorkOrder = workOrder;
            return workOrder;
        } else {
            this.setLoadingInitial(true);
            try {
                workOrder = await agent.WorkOrders.details(id);
                this.setSavedWorkOrder(workOrder);
                runInAction(() => {
                    this.selectedSavedWorkOrder = workOrder;
                });
                this.setLoadingInitial(false);
                return workOrder;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    loadSavedWorkOrder = async (id: string) => {
        let workOrder = this.getSavedWorkOrder(id);
        if (workOrder) {
            this.selectedSavedWorkOrder = workOrder;
            return workOrder;
        } else {
            this.setLoadingInitial(true);
            try {
                workOrder = await agent.WorkOrders.details(id);
                this.setWorkOrder(workOrder);
                runInAction(() => {
                    this.selectedWorkOrder = workOrder;
                });
                this.setLoadingInitial(false);
                return workOrder;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setWorkOrder = (workOrder: WorkOrder) => {
        workOrder.dateReleased = new Date(workOrder.dateReleased!);
        workOrder.startDate = new Date(workOrder.startDate!);
        workOrder.completionDate = new Date(workOrder.completionDate!);
        this.workOrderRegistery.set(workOrder.id, workOrder);
    }

    private setSavedWorkOrder = (workOrder: WorkOrder) => {
        workOrder.dateReleased = new Date(workOrder.dateReleased!);
        workOrder.startDate = new Date(workOrder.startDate!);
        workOrder.completionDate = new Date(workOrder.completionDate!);
        this.savedWorkOrderRegistery.set(workOrder.id, workOrder);
    }

    private getWorkOrder = (id: string) => {
        return this.workOrderRegistery.get(id);
    }
    private getSavedWorkOrder = (id: string) => {
        return this.savedWorkOrderRegistery.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createWorkOrder = async (workOrder: WorkOrderFormValues) => {
        try {
            await agent.WorkOrders.create(workOrder);
            const newWorkOrder = new WorkOrder(workOrder);
            this.setWorkOrder(newWorkOrder);
            runInAction(() => {
                this.selectedWorkOrder = newWorkOrder;
            });
        } catch (error) {
            console.log(error);
        }

    }

    updateWorkOrder = async (workOrder: WorkOrderFormValues) => {
        try {
            await agent.WorkOrders.update(workOrder);
            runInAction(() => {
                if (workOrder.id) {
                    if (workOrder.orderStatus.toLowerCase() === 'saved')
                    {
                        let updatedSavedWorkOrder = { ...this.getSavedWorkOrder(workOrder.id), ...workOrder };
                        this.savedWorkOrderRegistery.set(workOrder.id, updatedSavedWorkOrder as WorkOrder);
                    } else {
                        let updatedWorkOrder = { ...this.getWorkOrder(workOrder.id), ...workOrder };
                        this.workOrderRegistery.set(workOrder.id, updatedWorkOrder as WorkOrder);
                    }
                    this.selectedWorkOrder = undefined;
                    this.selectedSavedWorkOrder = undefined;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    releaseWorkOrder = async (workOrder: WorkOrderFormValues) => {
        workOrder.orderStatus = 'released';
        try {
            await agent.WorkOrders.update(workOrder);
            runInAction(() => {
                if (workOrder.id) {
                    this.savedWorkOrderRegistery.delete(workOrder.id);
                    this.workOrderRegistery.set(workOrder.id, workOrder as WorkOrder);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteWorkOrder = async (id: string) => {
        this.loading = true;
        console.log(id);
        try {
            await agent.WorkOrders.delete(id);
            runInAction(() => {
                this.workOrderRegistery.delete(id);
                this.savedWorkOrderRegistery.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getReport = async (reportName: string) => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.WorkOrders.report(reportName);
            runInAction(() => {
                switch (reportName) {
                    case 'WorkOrdersReleasedDaily':
                        this.WorkOrdersReleasedDaily = result;
                        break;
                    case 'HotWorkOrdersDaily':
                        this.HotWorkOrdersDaily = result;
                        break;
                    case 'WorkOrdersCompleted':
                        this.WorkOrdersCompleted = result;
                        break;
                    case 'WorkOrdersPastDue':
                        this.WorkOrdersPastDue = result;
                        console.log(result);
                        break;
                    case 'WorkOrdersInProgress':
                        this.WorkOrdersInProgress = result;
                        break;
                    case 'WorkOrdersProdLine':
                        this.WorkOrdersProdLine = result;
                        break;
                }
                this.setLoadingInitial(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        }
    }
}