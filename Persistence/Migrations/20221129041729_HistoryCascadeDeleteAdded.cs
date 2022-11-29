using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class HistoryCascadeDeleteAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkOrderHistory_WorkOrders_WorkOrderId",
                table: "WorkOrderHistory");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkOrderHistory_WorkOrders_WorkOrderId",
                table: "WorkOrderHistory",
                column: "WorkOrderId",
                principalTable: "WorkOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkOrderHistory_WorkOrders_WorkOrderId",
                table: "WorkOrderHistory");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkOrderHistory_WorkOrders_WorkOrderId",
                table: "WorkOrderHistory",
                column: "WorkOrderId",
                principalTable: "WorkOrders",
                principalColumn: "Id");
        }
    }
}
