namespace Domain
{
    public class HotNews
    {
        public int Id { get; set; }
        public string WorkOrder { get; set; }
        public string Summary { get; set; }
        public AppUser Author { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}