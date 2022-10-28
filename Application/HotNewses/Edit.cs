using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HotNewses
{
    public class Edit
    {
        public class Command : IRequest<Result<HotNewsDto>>
        {
            public int Id { get; set; }
            public string WorkOrder { get; set; }
            public string Summary { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.WorkOrder).NotEmpty();
                RuleFor(x => x.Summary).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<HotNewsDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<HotNewsDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var news = await _context.HotNewses.FindAsync(request.Id);
                if (news == null) return null;
                news.WorkOrder = request.WorkOrder;
                news.Summary = request.Summary;
                news.CreatedAt = DateTime.UtcNow;
                news.Author = user;
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<HotNewsDto>.Failure("Failed to update news");
                return Result<HotNewsDto>.Success(_mapper.Map<HotNewsDto>(news));
            }
        }
    }
}