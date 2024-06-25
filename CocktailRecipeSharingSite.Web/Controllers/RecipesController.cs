using CocktailRecipeSharingSite.Data;
using CocktailRecipeSharingSite.Web.ClientApp.src.Models;
using CocktailRecipeSharingSite.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CocktailRecipeSharingSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly string _connection;

        public RecipesController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpPost("AddCategory")]
        public string AddCategory(Category category)
        {
            var repo = new RecipesRepository(_connection);
            return repo.AddCategory(category);
        }

        [HttpGet("GetCategories")]
        public List<Category> GetCategories()
        {
            var repo = new RecipesRepository(_connection);
            return repo.GetCategories();
        }

        [HttpPost("AddRecipe")]
        public void AddRecipe(RecipeUploadVM vm)
        {
            SaveImageToFolder(vm.Recipe, vm.ImageFile);

            var UsersRepo = new UsersRepository(_connection);

            var recipe = vm.Recipe;
            recipe.UserId = UsersRepo.GetByEmail(User.Identity.Name).Id;

            var repo = new RecipesRepository(_connection);
            repo.AddRecipe(recipe);
        }

        private Recipe SaveImageToFolder(Recipe recipe, ImageUploadVM vm)
        {

            if(vm.FileName==null)
            {
                return recipe;
            }


            var imageFileName = $"{Guid.NewGuid()}{vm.FileName}";

            int indexOfComma = vm.Base64.IndexOf(",");
            string base64 = vm.Base64.Substring(indexOfComma + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"uploads/{imageFileName}", bytes);

            recipe.ImageFileName = imageFileName;
            return recipe;
        }

        [HttpGet("ViewImage")]
        public IActionResult ViewImage(string imageFileName)
        {
            var bytes = System.IO.File.ReadAllBytes($"Uploads/{imageFileName}");
            return File(bytes, "image/jpeg");
        }

        [HttpGet("GetAllRecipes")]
        public List<Recipe> GetAllRecipes()
        {
            var repo = new RecipesRepository(_connection);
            return repo.GetAllRecipes();
        }

        [HttpGet("GetCategoryName")]
        public string GetCategoryName(string categoryId)
        {
            var repo = new RecipesRepository(_connection);
            return repo.GetCategoryName(int.Parse(categoryId));
        }
    }
}
