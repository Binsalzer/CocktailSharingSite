using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CocktailRecipeSharingSite.Data
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Recipe> Recipes { get; set; }

        [NotMapped]
        public int RecipeCount { get; set; }
    }
}
