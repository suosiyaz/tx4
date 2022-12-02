using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkOrders
{
    public class Details
    {
        public class Query : IRequest<Result<WorkOrderDetailDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorkOrderDetailDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<WorkOrderDetailDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<WorkOrderDetailDto>.Success(await _context.WorkOrders.Include(x => x.History).ProjectTo<WorkOrderDetailDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(w => w.Id == request.Id));
            }
        }
    }
}