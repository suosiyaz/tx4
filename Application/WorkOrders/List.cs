using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.WorkOrders
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<WorkOrderDto>>>
        {
            public WorkOrderParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<WorkOrderDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<WorkOrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.WorkOrders
                    .OrderByDescending(d => d.DateReleased)
                    .ProjectTo<WorkOrderDto>(_mapper.ConfigurationProvider)
                    .AsQueryable().Where(x => x.OrderStatus.ToLower() != "saved");

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
                if (!String.IsNullOrEmpty(request.Params.Assembly))
                {
                    query = query.Where(x => x.Assembly == request.Params.Assembly);
                }
                if (!String.IsNullOrEmpty(request.Params.ReleaseDateFrom.ToString()))
                {
                    query = query.Where(x => x.DateReleased >= request.Params.ReleaseDateFrom);
                }
                if (!String.IsNullOrEmpty(request.Params.ReleaseDateTo.ToString()))
                {
                    query = query.Where(x => x.DateReleased <= request.Params.ReleaseDateTo);
                }
                if (!String.IsNullOrEmpty(request.Params.CompletionDateFrom.ToString()))
                {
                    query = query.Where(x => x.CompletionDate >= request.Params.CompletionDateFrom);
                }
                if (!String.IsNullOrEmpty(request.Params.CompletionDateTo.ToString()))
                {
                    query = query.Where(x => x.CompletionDate <= request.Params.CompletionDateTo);
                }
                if (!String.IsNullOrEmpty(request.Params.ProdLine))
                {
                    query = query.Where(x => x.ProdLine == request.Params.ProdLine);
                }

                return Result<PagedList<WorkOrderDto>>.Success(await PagedList<WorkOrderDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}