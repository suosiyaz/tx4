using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.WorkOrders
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorkOrder WorkOrder { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.WorkOrder).SetValidator(new WorkOrderValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.WorkOrders.Add(request.WorkOrder);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create work order");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}