using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.QA
{
    public class Details
    {
        public class Query : IRequest<Result<QADetailsDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<QADetailsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<QADetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.QualityReviews.Include(x => x.WorkOrder).Where(x => x.WorkOrder.Id == request.Id).ProjectTo<QADetailsDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
                if (result == null)
                {
                    var workOrder = await _context.WorkOrders.FirstOrDefaultAsync(w => w.Id == request.Id);
                    result = new QADetailsDto {
                        Job = workOrder.Job,
                        ProdLine = workOrder.ProdLine,
                        Assembly = workOrder.Assembly
                    };
                }
                return Result<QADetailsDto>.Success(result);
            }
        }
    }
}