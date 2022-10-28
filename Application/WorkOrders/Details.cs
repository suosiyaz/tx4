using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.WorkOrders
{
    public class Details
    {
        public class Query : IRequest<Result<WorkOrder>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorkOrder>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<WorkOrder>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<WorkOrder>.Success(await _context.WorkOrders.FindAsync(request.Id));
            }
        }
    }
}