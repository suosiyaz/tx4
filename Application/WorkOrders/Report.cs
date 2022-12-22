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
                var myData = await _context.WorkOrders.ToListAsync();
                var query = _context.WorkOrders
                    .ProjectTo<WorkOrderDto>(_mapper.ConfigurationProvider)
                    .AsEnumerable();

                if (request.ReportName == "WorkOrdersReleasedDaily")
                {
                    for (int i = 1; i <= DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month); i++)
                    {
                        var myDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, i);
                        ReportList.Add(new ReportDto
                        {
                            ReportLabel = myDate.Date.ToString("yyyy-MM-dd"),
                            Quantity = myData.Where(s => s.DateReleased == null ? false : s.DateReleased.Value.Date == myDate.Date).Count()
                        });
                    }
                }
                else if (request.ReportName == "WorkOrdersPastDue")
                {
                    for (int i = 1; i <= DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month); i++)
                    {
                        var myDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, i);
                        ReportList.Add(new ReportDto
                        {
                            ReportLabel = myDate.Date.ToString("yyyy-MM-dd"),
                            Quantity = query.Where(s => (s.DateReleased == null ? false : s.DateReleased.Value.Date == myDate.Date) && s.SLABreached).Count()
                        });
                    }
                }
                else if (request.ReportName == "HotWorkOrdersDaily")
                {
                    for (int i = 1; i <= DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month); i++)
                    {
                        var myDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, i);
                        ReportList.Add(new ReportDto
                        {
                            ReportLabel = myDate.Date.ToString("yyyy-MM-dd"),
                            Quantity = myData.Where(s => (s.DateReleased == null ? false : s.DateReleased.Value.Date == myDate.Date) && s.HotOrder).Count()
                        });
                    }
                }
                else if (request.ReportName == "WorkOrdersCompleted")
                {
                    for (int i = 1; i <= DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month); i++)
                    {
                        var myDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, i);
                        ReportList.Add(new ReportDto
                        {
                            ReportLabel = myDate.Date.ToString("yyyy-MM-dd"),
                            Quantity = myData.Where(s => s.CompletionDate == null ? false : s.CompletionDate.Value.Date == myDate.Date).Count()
                        });
                    }
                }
                else if (request.ReportName == "WorkOrdersInProgress")
                {
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