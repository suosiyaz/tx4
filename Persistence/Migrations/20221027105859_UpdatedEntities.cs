using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class UpdatedEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aged",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "Completed",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "WorkOrders");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "WorkOrders",
                newName: "ScheduleToRelease");

            migrationBuilder.RenameColumn(
                name: "SLABreached",
                table: "WorkOrders",
                newName: "PendingQuantity");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                table: "AspNetUsers",
                newName: "Team");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "OrderQuantity",
                table: "WorkOrders",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<int>(
                name: "Job",
                table: "WorkOrders",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateReleased",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CompletionDate",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalComments",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompletedQuantity",
                table: "WorkOrders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "HelpRequiredFrom",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HotOrder",
                table: "WorkOrders",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "OrderSplitChildWOCreated",
                table: "WorkOrders",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "OrderStatus",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParentJob",
                table: "WorkOrders",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReconfigurationStatus",
                table: "WorkOrders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organisation",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WorkOrderHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    WorkOrderId = table.Column<Guid>(type: "TEXT", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CourseOfAction = table.Column<string>(type: "TEXT", nullable: true),
                    Comments = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrderHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkOrderHistory_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkOrderHistory_WorkOrders_WorkOrderId",
                        column: x => x.WorkOrderId,
                        principalTable: "WorkOrders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrderHistory_UserId",
                table: "WorkOrderHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrderHistory_WorkOrderId",
                table: "WorkOrderHistory",
                column: "WorkOrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkOrderHistory");

            migrationBuilder.DropColumn(
                name: "AdditionalComments",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "CompletedQuantity",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "HelpRequiredFrom",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "HotOrder",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "OrderSplitChildWOCreated",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "ParentJob",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "ReconfigurationStatus",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Organisation",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "ScheduleToRelease",
                table: "WorkOrders",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "PendingQuantity",
                table: "WorkOrders",
                newName: "SLABreached");

            migrationBuilder.RenameColumn(
                name: "Team",
                table: "AspNetUsers",
                newName: "DisplayName");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "WorkOrders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "OrderQuantity",
                table: "WorkOrders",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<double>(
                name: "Job",
                table: "WorkOrders",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateReleased",
                table: "WorkOrders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CompletionDate",
                table: "WorkOrders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Aged",
                table: "WorkOrders",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Completed",
                table: "WorkOrders",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Quantity",
                table: "WorkOrders",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
