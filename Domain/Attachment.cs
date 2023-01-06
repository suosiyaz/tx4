namespace Domain
{
    public class Attachment
    {
        public Guid Id { get; set; }
        public Guid ReviewId { get; set; }
        public string Path { get; set; }
        public string AttachmentType { get; set; }
    }
}