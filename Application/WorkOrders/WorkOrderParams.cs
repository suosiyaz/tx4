using Application.Core;

namespace Application.WorkOrders
{
    public class WorkOrderParams : PagingParams
    {
        public WorkOrderParams()
        {
            this.MaxPageSize = 100;
        }

        public string WorkOrders { get; set; }
        public string Status { get; set; }
        public DateTime? ReleaseDateFrom { get; set; } = null;
        public DateTime? ReleaseDateTo { get; set; } = null;
        public DateTime? CompletionDateFrom { get; set; } = null;
        public DateTime? CompletionDateTo { get; set; } = null;
        public string Type { get; set; }
        public string Class { get; set; }
        public string Assembly { get; set; }
        public string ProdLine { get; set; }
    }
}