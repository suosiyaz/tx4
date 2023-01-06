using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.QA
{
    public class List
    {
        public class Query : IRequest<Result<List<WorkOrderQADto>>>
        {
            public WorkOrderParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<WorkOrderQADto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<WorkOrderQADto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.WorkOrders
                    .OrderByDescending(d => d.DateReleased)
                    .ProjectTo<WorkOrderQADto>(_mapper.ConfigurationProvider)
                    .Where(x => x.OrderStatus.ToLower() != "saved");

                if (!String.IsNullOrEmpty(request.Params.WorkOrders))
                {
                    var workOrderList = request.Params.WorkOrders.Split(",").Select(double.Parse).ToList();
                    query = query.Where(x => workOrderList.Contains(x.Job));
                }
                if (!String.IsNullOrEmpty(request.Params.Status))
                {
                    query = query.Where(x => x.OrderStatus == request.Params.Status);
                }
                if (!String.IsNullOrEmpty(request.Params.Type))
                {
                    query = query.Where(x => x.Type == request.Params.Type);
                }
                if (!String.IsNullOrEmpty(request.Params.Class))
                {
                    query = query.Where(x => x.Class == request.Params.Class);
                }

                return Result<List<WorkOrderQADto>>.Success(await query.ToListAsync());

            }
        }
    }
}