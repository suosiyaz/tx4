using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Policy = "IsAdmin")]
    public class UsersController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public UsersController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(string searchKey)
        {
            var result = await Mediator.Send(new List.Query { SearchKey = searchKey });
            return HandleResult(result);
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUser(string userName)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = userName }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserCreateDto user)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == user.Email))
            {
                ModelState.AddModelError("email", "Email already exists");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == user.UserName))
            {
                ModelState.AddModelError("username", "UserName already exists");
                return ValidationProblem();
            }

            if (user.Team.ToLower() != "parent" && user.UserRole.ToLower() == "admin")
            {
                ModelState.AddModelError("userRole", "The user cannot be made Admin");
                return ValidationProblem();
            }
            return HandleResult(await Mediator.Send(new Create.Command { User = user }));
        }

        [HttpPut("{userName}")]
        public async Task<IActionResult> EditUser(string userName, UserUpdateDto user)
        {

            if (user.Team.ToLower() != "parent" && user.UserRole.ToLower() == "admin")
            {
                ModelState.AddModelError("userRole", "The user cannot be made Admin");
                return ValidationProblem();
            }
            user.UserName = userName;
            return HandleResult(await Mediator.Send(new Edit.Command { User = user }));
        }

        [HttpDelete("{userName}")]
        public async Task<IActionResult> DeleteUser(string userName)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { UserName = userName }));
        }
    }
}