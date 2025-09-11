using Microsoft.Extensions.Logging;
using Ordering.Core.Entities;

namespace Ordering.Infrastructure.Data
{
    public class OrderContextSeed
    {
        public static async Task SendAsync(OrderContext orderContext, ILogger<OrderContextSeed> logger)
        {
            if (orderContext.Orders.Any())
            {
                orderContext.Orders.AddRange(GetOrders());
                await orderContext.SaveChangesAsync();
                logger.LogInformation($"Ordering Database: {typeof(OrderContext).Name} seeded!!");
            }
        }

        private static IEnumerable<Order> GetOrders()
        {
            return new List<Order>
            {
                new ()
                {
                    UserName = "danzzy",
                    FirstName = "Danzzy",
                    LastName = "Tech",
                    EmailAddress = "danzzytech@mailinator.com",
                    AddressLine = "Bamvim",
                    Country = "Ghana",
                    TotalPrice = 800,
                    State = "Northern Region",
                    ZipCode = "233",
                    CardName = "Visa",
                    CardNumber = "4531000008004567",
                    CreatedBy = "Danzzy",
                    Expiration = "12/29",
                    Cvv = "456",
                    PaymentMethod = 1,
                    LastModifiedBy = "Danzzy",
                    LastModifiedDate = new DateTime()
                }
            };
        }
    }
}
