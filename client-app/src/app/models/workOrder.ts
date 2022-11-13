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
    prodLine: string;
    slaBreached: boolean;
    organization: string;
    aged: number;
    parentJob: number;
    hotOrder: boolean;

  }

  export class WorkOrder implements WorkOrder {
    constructor(init?: WorkOrderFormValues) {
      Object.assign(this, init);
    }
  }

  export class WorkOrderFormValues {
    id: string = '';
    job: number | undefined = undefined;
    type: string = '';
    assembly: string = '';
    class: string = '';
    dateReleased: Date | undefined = undefined;
    startDate: Date | undefined = undefined;
    completionDate: Date | undefined = undefined;
    scheduleToRelease: Date | undefined = undefined;
    orderQuantity: number | undefined = undefined;
    completedQuantity: number | undefined = undefined;
    pendingQuantity: number | undefined = undefined;
    orderStatus: string = '';
    prodLine: string = '';
    organization: string = '';
    parentJob: number | undefined = undefined;
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