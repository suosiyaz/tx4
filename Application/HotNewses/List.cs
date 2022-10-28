using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HotNewses
{
    public class List
    {
         public class Query : IRequest<Result<List<HotNewsDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<HotNewsDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<HotNewsDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var news = await _context.HotNewses
                    .OrderByDescending(x => x.CreatedAt).ProjectTo<HotNewsDto>(_mapper.ConfigurationProvider).ToListAsync();

                return Result<List<HotNewsDto>>.Success(news);
            }
        }
    }
}