namespace Application.WorkOrders
{
    public class WorkOrderHistoryDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Team { get; set; }
        public int Job { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string CourseOfAction { get; set; }
        public string Comments { get; set; }

    }
}