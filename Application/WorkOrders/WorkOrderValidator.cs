using Domain;
using FluentValidation;

namespace Application.WorkOrders
{
    public class WorkOrderValidator : AbstractValidator<WorkOrder>
    {
        public WorkOrderValidator()
        {
            RuleFor(x => x.CompletedQuantity).NotEmpty();
            RuleFor(x => x.PendingQuantity).NotEmpty();
            RuleFor(x => x.ProdLine).NotEmpty();
            RuleFor(x => x.OrderStatus).NotEmpty();
            RuleFor(x => x.CompletionDate).NotEmpty();
        }
    }
}