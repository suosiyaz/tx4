using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AddedQAEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "WorkOrders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "QACompletedDate",
                table: "WorkOrders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QualityStatus",
                table: "WorkOrders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ReadyForQuality",
                table: "WorkOrders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "QualityReview",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuantityReviewDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GlobalRework = table.Column<int>(type: "int", nullable: false),
                    DeviceSerialNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FAIPassed = table.Column<bool>(type: "bit", nullable: false),
                    IssuesDocumented = table.Column<bool>(type: "bit", nullable: false),
                    VerificationStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IssueDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityReview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QualityReview_WorkOrders_Id",
                        column: x => x.Id,
                        principalTable: "WorkOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReviewId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attachments_QualityReview_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "QualityReview",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_ReviewId",
                table: "Attachments",
                column: "ReviewId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "QualityReview");

            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "QACompletedDate",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "QualityStatus",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "ReadyForQuality",
                table: "WorkOrders");
        }
    }
}
