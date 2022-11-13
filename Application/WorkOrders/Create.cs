using Application.Core;
using AutoMapper;
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
                var workOrder = new WorkOrder();
                _mapper.Map(request.WorkOrder, workOrder);
                _context.WorkOrders.Add(workOrder);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create work order");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}