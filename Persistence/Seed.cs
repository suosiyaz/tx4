using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            var users = new List<AppUser>
            {
                new AppUser{FirstName = "Mohammed Shiyas", LastName="Puthankode", UserName ="shiyas", Email = "shiyas@parent.com", UserRole="admin", Team="Parent", Organisation="Org4", IsActive=true},
                new AppUser{FirstName = "Eswar", LastName="Chavvakula", UserName ="eswar", Email = "eswar@parent.com", UserRole="admin", Team="Parent", Organisation="Org4", IsActive=true},
                new AppUser{FirstName = "Manesh", LastName="Abraham", UserName ="manesh", Email = "manesh@partner.com", UserRole="supervisor", Team="Partner", Organisation="Org4", IsActive=true},
                new AppUser{FirstName = "Lalgy", LastName="Thomas", UserName ="lalgy", Email = "lalgy@partner.com", UserRole="user", Team="Partner", Organisation="Org4", IsActive=true}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            if (context.WorkOrders.Any()) return;

            var workOrders = new List<WorkOrder>();

            for (int i = 1; i <= 200; i++)
            {
                var workOrder = new WorkOrder();
                workOrder.Job = 123455 + i;
                workOrder.Type = i % 2 == 0 ? "Non-Standard" : "Standard";
                workOrder.Assembly = "Assembly " + i;
                workOrder.Class = i % 3 == 0 ? "Non-Standard" : i % 3 == 1 ? "OSP-Reconf" : "Standard";
                int dateRemainder = i % 30;
                workOrder.DateReleased = i % 3 == 0 ? null : DateTime.Now.AddDays(-dateRemainder);
                workOrder.StartDate = i % 3 == 0 ? null : i % 3 == 1 ? DateTime.Now.AddDays(-dateRemainder + 4) : DateTime.Now.AddDays(-dateRemainder + 6);
                workOrder.CompletionDate = i % 3 == 0 ? null : i % 3 == 1 ? DateTime.Now.AddDays(-dateRemainder + 10) : null;
                workOrder.ScheduleToRelease = i % 3 == 0 ? (i % 2 == 0 ? null : DateTime.Now.AddDays(dateRemainder)) : null;
                workOrder.OrderQuantity = i * 15;
                workOrder.CompletedQuantity = i % 3 == 0 ? 0 : i % 3 == 1 ? i * 15 : i * 11;
                workOrder.PendingQuantity = i % 3 == i * 15 ? 0 : i % 3 == 1 ? 0 : i * 4;
                workOrder.OrderStatus = i % 3 == 0 ? "Saved" : i % 2 == 0 ? "In-Progress" : "Released";
                workOrder.ReconfigurationStatus = i % 3 == 0 ? null : i % 2 == 0 ? "In-Progress" : "Released";
                int prodRemainder = i % 6;
                switch (prodRemainder)
                {
                    case 1:
                        workOrder.ProdLine = "Location Solutions";
                        break;
                    case 2:
                        workOrder.ProdLine = "Card";
                        break;
                    case 3:
                        workOrder.ProdLine = "Aftermarket Products";
                        break;
                    case 4:
                        workOrder.ProdLine = "Desktop";
                        break;
                    case 5:
                        workOrder.ProdLine = "Common Cradle";
                        break;
                    case 0:
                        workOrder.ProdLine = "Tabletop";
                        break;

                }
                workOrder.ReconfigurationStatus = i % 3 == 0 ? null : i % 2 == 0 ? "In-Progress" : "Released";
                int orgRemainder = i % 5;
                workOrder.Organization = "Org" + orgRemainder;
                workOrder.ParentJob = i % 10 == 0 ? 123455 + i - 10 : null;
                workOrder.HotOrder = i % 4 == 3 ? true : false;
                workOrder.HelpRequiredFrom = null;
                workOrder.OrderSplitChildWOCreated = i % 10 == 0 ? true : false;
                workOrder.AdditionalComments = null;
                workOrder.History = new List<WorkOrderHistory>
                {
                    new WorkOrderHistory
                    {
                        User = users[i % 4],
                        UpdatedOn = DateTime.Now.AddDays(dateRemainder),
                        CourseOfAction = null,
                        Comments = null
                    }
                };
                workOrders.Add(workOrder);
            }

            await context.WorkOrders.AddRangeAsync(workOrders);
            await context.SaveChangesAsync();
        }
    }
}