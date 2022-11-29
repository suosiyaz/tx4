using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkOrders
{
    public class ListSaved
    {
        public class Query : IRequest<Result<List<WorkOrderDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<WorkOrderDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<WorkOrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var workOrders = await _context.WorkOrders
                    .ProjectTo<WorkOrderDto>(_mapper.ConfigurationProvider)
                    .Where(x => x.OrderStatus.ToLower() == "saved").ToListAsync();

                return Result<List<WorkOrderDto>>.Success(workOrders);
            }
        }
    }
}