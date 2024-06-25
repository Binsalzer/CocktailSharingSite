using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CocktailRecipeSharingSite.Data
{
    public class RecipesRepository
    {
        private readonly string _connection;

        public RecipesRepository(string connection)
        {
            _connection = connection;
        }

        public string AddCategory(Category category)
        {
            using var context = new CocktailRecipeSharingDataContext(_connection);
            var alreadyInList = context.Categories.FirstOrDefault(c => c.Name == category.Name) != null;
            if(alreadyInList)
            {
                return "This Category already exists!";
            }
            context.Add(category);
            context.SaveChanges();
            return "Succesfully Added!";
        }

        public List<Category> GetCategories()
        { 
            using var context = new CocktailRecipeSharingDataContext(_connection);
            var categories = context.Categories.Include(c => c.Recipes).ToList();
            foreach (Category c in categories)
            {
                c.RecipeCount = c.Recipes.Count;
            }

            return categories;
        }

        public void AddRecipe(Recipe recipe)
        {
            using var context = new CocktailRecipeSharingDataContext(_connection);
            recipe.DBIngredients = JsonSerializer.Serialize(recipe.Ingredients);
            recipe.DBSteps = JsonSerializer.Serialize(recipe.Steps);
            context.Recipes.Add(recipe);
            context.SaveChanges();
        }

        public List<Recipe> GetAllRecipes()
        {
            using var context = new CocktailRecipeSharingDataContext(_connection);
            var recipes = context.Recipes.OrderBy(r => r.Title);
            foreach(Recipe r in recipes)
            {
                r.Ingredients= JsonSerializer.Deserialize<string[]>(r.DBIngredients).ToList();
                r.Steps = JsonSerializer.Deserialize<string[]>(r.DBSteps).ToList();
            }
            return recipes.ToList();
        }

        public string GetCategoryName(int categoryId)
        {
            using var context = new CocktailRecipeSharingDataContext(_connection);
            return context.Categories.FirstOrDefault(c => c.Id == categoryId).Name;
        }
    }
}
