namespace Application.QA
{
    public class WorkOrderQADto
    {
        public Guid Id { get; set; }
        public int Job { get; set; }
        public string Type { get; set; }
        public string Assembly { get; set; }
        public string Class { get; set; }
        public string Organization { get; set; }
        public DateTime? DateReleased { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public int OrderQuantity { get; set; }
        public string OrderStatus { get; set; }
        public string ProdLine { get; set; }
        public bool ReadyForQuality { get; set; }
        public string Feedback { get; set; }
        public string QualityStatus { get; set; }
        public DateTime? QACompletedDate { get; set; }
    }
}