using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Discount.Infrastructure.Extensions
{
    public static class DbExtension
    {
        public static IHost MigrateDatabase<TContext>(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var config = services.GetRequiredService<IConfiguration>();
                var logger = services.GetRequiredService<ILogger<TContext>>();

                try
                {
                    logger.LogInformation("Discount DB Migration Started");
                    ApplyMigration(config);
                    logger.LogInformation("Discount DB Migration Completed");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred");
                    throw;
                }

                return host;
            }
        }

        private static void ApplyMigration(IConfiguration config)
        {
            var retry = 5;

            while (retry > 0)
            {
                try
                {
                    using var connection = new NpgsqlConnection(config.GetValue<string>("DatabaseSettings:ConnectionString"));
                    connection.Open();
                    using var command = new NpgsqlCommand()
                    {
                        Connection = connection
                    };

                    command.CommandText = "DROP TABLE IF EXISTS Coupon";
                    command.ExecuteNonQuery();
                    command.CommandText = @"CREATE TABLE Coupon (Id SERIAL PRIMARY KEY,
                                                        ProductName VARCHAR(500) NOT NULL,
                                                        Description TEXT,
                                                        Amount INT)";
                    command.ExecuteNonQuery();

                    command.CommandText = "INSERT INTO Coupon (ProductName, Description, Amount) VALUES ('Adidas Quick Force Indoor Badminton Shoes', 'Shoe Discount', 500)";
                    command.ExecuteNonQuery();

                    command.CommandText = "INSERT INTO Coupon (ProductName, Description, Amount) VALUES ('Yonex VCORE Pro 100 A Tennis Racquet (270gm, Strung)', 'Racket Discount', 700)";
                    command.ExecuteNonQuery();

                    break;
                    // exit loop if successful
                }
                catch (Exception ex)
                {
                    retry--;

                    if (retry == 0)
                    {
                        throw;
                    }
                    // wait for 2 seconds
                    Thread.Sleep(2000);
                }
            }
        }
    }
}
