using System.ComponentModel.DataAnnotations;

namespace Application.Users
{
    public class UserCreateDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Team { get; set; }
        [Required]
        public string UserRole { get; set; }
        [Required]
        public string Organisation { get; set; }
        [Required]
        public bool IsActive { get; set; }
    }
}