using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CocktailRecipeSharingSite.Data
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string DBIngredients { get; set; }
        public string DBSteps { get; set; }
        public string ImageFileName { get; set; }
        public bool IsPublic { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }

        [NotMapped]
        public List<string> Ingredients { get; set; }
        [NotMapped]
        public List<string> Steps { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
    }
}
