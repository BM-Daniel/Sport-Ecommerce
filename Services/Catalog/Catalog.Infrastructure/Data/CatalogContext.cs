using Catalog.Core.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Catalog.Infrastructure.Data
{
    public class CatalogContext : ICatalogContext
    {
        public IMongoCollection<Product> Products { get; }

        public IMongoCollection<ProductBrand> Brands { get; }

        public IMongoCollection<ProductType> Types { get; }

        public CatalogContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase(configuration.GetValue<string>("DatabaseSettings:DatabaseName"));

            Console.WriteLine(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            Console.WriteLine(client);
            Console.WriteLine(database);

            Brands = database.GetCollection<ProductBrand>(configuration.GetValue<String>("DatabaseSettings:BrandsCollection"));
            Types = database.GetCollection<ProductType>(configuration.GetValue<String>("DatabaseSettings:TypesCollection"));
            Products = database.GetCollection<Product>(configuration.GetValue<String>("DatabaseSettings:CollectionName"));

            BrandContextSeed.SeedData(Brands);
            TypeContextSeed.SeedData(Types);
            CatalogContextSeed.SeedData(Products);
        }
    }
}
