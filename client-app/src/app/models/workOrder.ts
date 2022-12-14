import { WorkOrderHistory } from './workOrderHistory';

export interface WorkOrder {
    id: string;
    job: number;
    type: string;
    assembly: string;
    class: string;
    dateReleased: Date | undefined;
    startDate: Date | undefined;
    completionDate: Date | undefined;
    scheduleToRelease: Date | undefined;
    orderQuantity: number;
    completedQuantity: number;
    pendingQuantity: number;
    orderStatus: string;
    reconfigurationStatus: string;
    prodLine: string;
    slaBreached: boolean;
    organization: string;
    parentJob: number;
    hotOrder: boolean;
    aged: number;
    helpRequiredFrom: string;
    orderSplitChildWOCreated: boolean;
    additionalComments: string;
    history: WorkOrderHistory[];
    orderProcessingLine: string;
    expectedCompletionDate: Date;
    readyForQuality: boolean;
    feedback: string;
    qualityStatus: string;
    qaCompletedDate: Date | undefined;
  }

  export class WorkOrder implements WorkOrder {
    constructor(init?: WorkOrderFormValues) {
      Object.assign(this, init);
    }
  }

  export class WorkOrderFormValues {
    id: string = '';
    job: number = 0;
    type: string = '';
    assembly: string = '';
    class: string = '';
    dateReleased: Date | undefined = undefined;
    startDate: Date | undefined = undefined;
    completionDate: Date | undefined = undefined;
    scheduleToRelease: Date | undefined = undefined;
    orderQuantity: number = 0;
    completedQuantity: number | undefined = undefined;
    pendingQuantity: number = 0;
    orderStatus: string = '';
    prodLine: string = '';
    organization: string = '';
    parentJob: number = 0;
    hotOrder: boolean = false;

    constructor(workOrder?: WorkOrderFormValues) {
      if (workOrder) {
        this.id = workOrder.id;
        this.job = workOrder.job;
        this.type = workOrder.type;
        this.assembly = workOrder.assembly;
        this.class = workOrder.class;
        this.dateReleased = workOrder.dateReleased;
        this.startDate = workOrder.startDate;
        this.completionDate = workOrder.completionDate;
        this.orderQuantity = workOrder.orderQuantity;
        this.completedQuantity = workOrder.completedQuantity;
        this.pendingQuantity = workOrder.pendingQuantity;
        this.orderStatus = workOrder.orderStatus;
        this.prodLine = workOrder.prodLine;
        this.organization = workOrder.organization;
        this.scheduleToRelease = workOrder.scheduleToRelease;
        this.parentJob = workOrder.parentJob;
        this.hotOrder = workOrder.hotOrder;
      }
    }
   }