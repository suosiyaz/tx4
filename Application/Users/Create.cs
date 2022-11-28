using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UserCreateDto User { get; set; }
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
                var user = new AppUser();
                _mapper.Map(request.User, user);
                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded) return Result<Unit>.Failure("Failed to create user");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}