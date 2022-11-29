using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsZebraRequirement : IAuthorizationRequirement
    {
        
    }

    public class IsZebraRequirementHandler : AuthorizationHandler<IsZebraRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dbContext;
        public IsZebraRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsZebraRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.Name);

            if (userId == null) return Task.CompletedTask;

            var user = _dbContext.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserName == userId && x.Team.ToLower() == "zebra" && (x.UserRole.ToLower() == "admin" || x.UserRole.ToLower() == "planner")).Result;

            if (user == null) return Task.CompletedTask;

            context.Succeed(requirement);

            return Task.CompletedTask;

        }
    }
}