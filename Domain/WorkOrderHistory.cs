namespace Domain
{
    public class WorkOrderHistory
    {
        public Guid Id { get; set; }
        public AppUser User { get; set; }
        public WorkOrder WorkOrder { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string CourseOfAction { get; set; }
        public string Comments { get; set; }

    }
}