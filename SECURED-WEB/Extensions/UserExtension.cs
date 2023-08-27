using System.Security.Claims;

namespace SECURED_WEB.Extensions;

public static class UserExtension
{
    public static int? GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if(userId == null)
        {
            return null;
        }
        return int.Parse(userId);
    }

    public static string? GetUserName(this ClaimsPrincipal claimsPrinciple)
    {
        return claimsPrinciple.Identity?.Name;
    }
}
