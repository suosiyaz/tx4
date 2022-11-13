using FluentValidation;

namespace Application.WorkOrders
{
    public class WorkOrderValidator : AbstractValidator<WorkOrderCreateDto>
    {
        public WorkOrderValidator()
        {
            RuleFor(x => x.Job).NotEmpty();
            RuleFor(x => x.OrderStatus).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.OrderQuantity).NotEmpty();
            RuleFor(x => x.Assembly).NotEmpty();
            RuleFor(x => x.ProdLine).NotEmpty();
            RuleFor(x => x.Class).NotEmpty();
            RuleFor(x => x.HotOrder).NotEmpty();
            RuleFor(x => x.Organization).NotEmpty();
        }
    }
}