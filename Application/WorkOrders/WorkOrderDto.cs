namespace Application.WorkOrders
{
    public class WorkOrderDto
    {
        public Guid Id { get; set; }
        public int Job { get; set; }
        public string Type { get; set; }
        public string Assembly { get; set; }
        public string Class { get; set; }
        public DateTime? DateReleased { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public int OrderQuantity { get; set; }
        public int CompletedQuantity { get; set; }
        public int PendingQuantity { get; set; }
        public string OrderStatus { get; set; }
        public string ProdLine { get; set; }
        public string Organization { get; set; }
        public bool SLABreached { get; set; }
        public int Aged { get; set; }
    }
}