using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Models
{
      public class User
    {
        public int Id { get; set; }
    
        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;
    
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
    }
    
    public class SignInRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    
        [Required]
        public string Password { get; set; } = string.Empty;
    }
    
    public class SignUpRequest
    {
        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;
    
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
    
        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}