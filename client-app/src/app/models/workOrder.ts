export interface WorkOrder {
    id: string;
    job: number;
    type: string;
    assembly: string;
    class: string;
    dateReleased: Date | null;
    startDate: Date | null;
    completionDate: Date | null;
    orderQuantity: number;
    completedQuantity: number;
    pendingQuantity: number;
    orderStatus: string;
    prodLine: string;
    slaBreached: boolean;
    organization: string;
    aged: number;
  }

  export class WorkOrder implements WorkOrder {
    constructor(init?: WorkOrderFormValues) {
      Object.assign(this, init);
    }
  }

  export class WorkOrderFormValues {
    id?: string = undefined;
    job: number = 0;
    type: string = '';
    assembly: string = '';
    class: string = '';
    dateReleased: Date | null = null;
    startDate: Date | null = null;
    completionDate: Date | null = null;
    orderQuantity: number = 0;
    completedQuantity: number = 0;
    pendingQuantity: number = 0;
    orderStatus: string = '';
    prodLine: string = '';
    slaBreached: boolean = false;
    organization: string = '';
    aged: number = 0;

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
        this.slaBreached = workOrder.slaBreached;
        this.organization = workOrder.organization;
        this.aged = workOrder.aged;
      }
    }
   }