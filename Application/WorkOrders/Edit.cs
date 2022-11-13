using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.WorkOrders
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorkOrderCreateDto WorkOrder { get; set; }
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var workOrder = await _context.WorkOrders.FindAsync(request.WorkOrder.Id);
                if (workOrder == null) return null;
                _mapper.Map(request.WorkOrder, workOrder);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update work order");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}