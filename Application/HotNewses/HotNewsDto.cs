namespace Application.HotNewses
{
    public class HotNewsDto
    {
        public int Id { get; set; }
        public string WorkOrder { get; set; }
        public string Summary { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}