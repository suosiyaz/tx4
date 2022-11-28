using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == request.UserName);
                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded) return Result<Unit>.Failure("Failed to delete user");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}