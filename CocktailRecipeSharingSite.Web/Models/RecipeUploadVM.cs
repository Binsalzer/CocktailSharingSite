using CocktailRecipeSharingSite.Data;
using CocktailRecipeSharingSite.Web.ClientApp.src.Models;

namespace CocktailRecipeSharingSite.Web.Models
{
    public class RecipeUploadVM
    {
        public Recipe Recipe { get; set; }
        public ImageUploadVM ImageFile { get; set; }
    }
}
