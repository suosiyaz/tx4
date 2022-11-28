using System.ComponentModel.DataAnnotations;

namespace Application.Users
{
    public class UserUpdateDto
    {
        [Required]
        public string Team { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserRole { get; set; }
        [Required]
        public string Organisation { get; set; }
        [Required]
        public bool IsActive { get; set; }
    }
}