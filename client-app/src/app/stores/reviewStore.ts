import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagination } from '../models/pagination';
import { QAReview } from '../models/qaReview';
import { WorkOrder } from '../models/workOrder';

export default class ReviewStore {
    QAWorkOrderRegistery = new Map<string, WorkOrder>();
    selectedWorkOrderForReview: QAReview | undefined = undefined;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    qaPredicate = new Map();
    uploading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setQAPredicate = (predicate: string, value: string | Date) => {
        if (value !== '' && value !== null) this.qaPredicate.set(predicate, value);
        else this.qaPredicate.delete(predicate);
    }
    
    resetQAParams = () => {
        this.qaPredicate.forEach((value, key) => this.qaPredicate.delete(key));
    }

    clearSelectedReview = () => {
        this.selectedWorkOrderForReview = undefined;
    }

    clearQAWorkOrders = () => {
        this.QAWorkOrderRegistery.clear();
    }

    get qaAxiosParams() {
        const params = new URLSearchParams();
        this.qaPredicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    get qaWorkOrders() {
        return Array.from(this.QAWorkOrderRegistery.values());
    }

    loadWorkOrdersForQA = async () => {
        this.setLoadingInitial(true);
        this.QAWorkOrderRegistery.clear();
        try {
            const result = await agent.QA.list(this.qaAxiosParams);
            result.data.forEach(workOrder => {
                this.setQAWorkOrder(workOrder);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadReview = async (id: string) => {
        this.setLoadingInitial(true);
        try {
            let review = await agent.QA.details(id);
            review.dateOfAudit = review.dateOfAudit ? new Date(review.dateOfAudit) : undefined;
            runInAction(() => {
                this.selectedWorkOrderForReview = review;
            });
            this.setLoadingInitial(false);
            return review;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setQAWorkOrder = (workOrder: WorkOrder) => {
        workOrder.dateReleased = workOrder.dateReleased ? new Date(workOrder.dateReleased) : undefined;
        workOrder.startDate = workOrder.startDate ? new Date(workOrder.startDate) : undefined;
        workOrder.completionDate = workOrder.completionDate ? new Date(workOrder.completionDate) : undefined;
        this.QAWorkOrderRegistery.set(workOrder.id, workOrder);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    reviewQuality = async (review: QAReview) => {
        try {
            await agent.QA.review(review);
            this.selectedWorkOrderForReview = undefined;
            runInAction(() => {
                if (review.id) {
                    this.loadReview(review.id);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    updateReview = async (review: QAReview) => {
        try {
            await agent.QA.update(review);
            this.selectedWorkOrderForReview = undefined;
            runInAction(() => {
                if (review.id) {
                    this.loadReview(review.id);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}