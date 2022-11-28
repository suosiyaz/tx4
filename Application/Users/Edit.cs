using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UserUpdateDto User { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> userManager, IMapper mapper)
            {
                _userManager = userManager;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == request.User.UserName);
                if (user == null) return null;
                _mapper.Map(request.User, user);
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded) return Result<Unit>.Failure("Failed to update user");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}