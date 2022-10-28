using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Team { get; set; }
        public string Organisation { get; set; }
        public string UserRole { get; set; }
        public bool IsActive { get; set; }
    }
}