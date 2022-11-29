using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper.QueryableExtensions;

namespace Application.WorkOrders
{
    public class Report
    {
        public class Query : IRequest<Result<List<ReportDto>>>
        {
            public string ReportName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ReportDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ReportDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).Date;
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1).Date; 
                var ReportList = new List<ReportDto>();

                if (request.ReportName == "WorkOrdersReleasedDaily")
                {
                    ReportList = await _context.WorkOrders.Where(s => s.DateReleased.Value.Date >= firstDayOfMonth && s.DateReleased.Value.Date <= lastDayOfMonth).GroupBy(x => x.DateReleased.Value.Date).Select(x => new ReportDto { ReportLabel = x.Key.ToString(), Quantity = x.Count() }).ToListAsync();
                }
                else if (request.ReportName == "WorkOrdersPastDue")
                {
                    var query =  _context.WorkOrders
                    .OrderByDescending(d => d.DateReleased)
                    .ProjectTo<WorkOrderDto>(_mapper.ConfigurationProvider)
                    .AsEnumerable();
                    ReportList = query.Where(s => s.CompletionDate != null && s.DateReleased.Value.Date >= firstDayOfMonth && s.DateReleased.Value.Date <= lastDayOfMonth && s.SLABreached).GroupBy(x => x.DateReleased.Value.Date).Select(x => new ReportDto { ReportLabel = x.Key.ToString(), Quantity = x.Count() }).ToList();
                }
                else if (request.ReportName == "HotWorkOrdersDaily")
                {
                    ReportList = await _context.WorkOrders.Where(s => s.DateReleased.Value.Date >= firstDayOfMonth && s.DateReleased.Value.Date <= lastDayOfMonth && s.HotOrder).GroupBy(x => x.DateReleased.Value.Date).Select(x => new ReportDto { ReportLabel = x.Key.ToString(), Quantity = x.Count() }).ToListAsync();
                }
                else if (request.ReportName == "WorkOrdersCompleted")
                {
                    ReportList = await _context.WorkOrders.Where(s => s.CompletionDate.Value.Date >= firstDayOfMonth && s.CompletionDate.Value.Date <= lastDayOfMonth).GroupBy(x => x.CompletionDate.Value.Date).Select(x => new ReportDto { ReportLabel = x.Key.ToString(), Quantity = x.Count() }).ToListAsync();
                }
                else if (request.ReportName == "WorkOrdersInProgress")
                {
                    var query =  _context.WorkOrders
                    .OrderByDescending(d => d.DateReleased)
                    .ProjectTo<WorkOrderDto>(_mapper.ConfigurationProvider)
                    .AsEnumerable();
                    ReportList = query.GroupBy(x => x.Aged).Select(x => new ReportDto { ReportLabel = x.Key.ToString(), Quantity = x.Count() }).ToList();
                }
                else if (request.ReportName == "WorkOrdersProdLine")
                {
                    ReportList = await _context.WorkOrders.GroupBy(x => x.ProdLine).Select(x => new ReportDto { ReportLabel = x.Key, Quantity = x.Count() }).ToListAsync();
                }

                return Result<List<ReportDto>>.Success(ReportList);
            }
        }
    }
}