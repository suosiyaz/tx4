using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class List
    {
        public class Query : IRequest<Result<List<UserDto>>>
        {
            public string SearchKey { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserDto>>>
        {
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;

            public Handler(IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
            }

            public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _userManager.Users.ToListAsync();
                if (!String.IsNullOrEmpty(request.SearchKey))
                {
                    string searchKey = request.SearchKey.ToLower();
                    users = await _userManager.Users.Where(x => x.UserName.ToLower().Contains(searchKey) || x.FirstName.ToLower().Contains(searchKey)
                        || x.LastName.ToLower().Contains(searchKey) || x.Email.ToLower().Contains(searchKey)).ToListAsync();
                }

                return Result<List<UserDto>>.Success(_mapper.Map<List<UserDto>>(users));
            }
        }
    }
}