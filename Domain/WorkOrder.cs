namespace Domain
{
    public class WorkOrder
    {
        public Guid Id { get; set; }
        public int Job { get; set; }
        public string Type { get; set; }
        public string Assembly { get; set; }
        public string Class { get; set; }
        public DateTime? DateReleased { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public DateTime? ScheduleToRelease { get; set; }
        public int OrderQuantity { get; set; }
        public int CompletedQuantity { get; set; }
        public int PendingQuantity { get; set; }
        public string OrderStatus { get; set; }
        public string ReconfigurationStatus { get; set; }
        public string ProdLine { get; set; }
        public string Organization { get; set; }
        public int? ParentJob { get; set; }
        public bool HotOrder { get; set; }
        public string HelpRequiredFrom { get; set; }
        public bool OrderSplitChildWOCreated { get; set; }
        public string AdditionalComments { get; set; }
        public string OrderProcessingLine { get; set; }
        public DateTime? ExpectedCompletionDate { get; set; }
        public ICollection<WorkOrderHistory> History { get; set; }        

    }
}