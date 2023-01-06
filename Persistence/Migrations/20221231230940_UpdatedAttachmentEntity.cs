using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class UpdatedAttachmentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_QualityReview_ReviewId",
                table: "Attachments");

            migrationBuilder.DropForeignKey(
                name: "FK_QualityReview_WorkOrders_Id",
                table: "QualityReview");

            migrationBuilder.DropIndex(
                name: "IX_Attachments_ReviewId",
                table: "Attachments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QualityReview",
                table: "QualityReview");

            migrationBuilder.RenameTable(
                name: "QualityReview",
                newName: "QualityReviews");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReviewId",
                table: "Attachments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "QualityReviewId",
                table: "Attachments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_QualityReviews",
                table: "QualityReviews",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_QualityReviewId",
                table: "Attachments",
                column: "QualityReviewId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_QualityReviews_QualityReviewId",
                table: "Attachments",
                column: "QualityReviewId",
                principalTable: "QualityReviews",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QualityReviews_WorkOrders_Id",
                table: "QualityReviews",
                column: "Id",
                principalTable: "WorkOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_QualityReviews_QualityReviewId",
                table: "Attachments");

            migrationBuilder.DropForeignKey(
                name: "FK_QualityReviews_WorkOrders_Id",
                table: "QualityReviews");

            migrationBuilder.DropIndex(
                name: "IX_Attachments_QualityReviewId",
                table: "Attachments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QualityReviews",
                table: "QualityReviews");

            migrationBuilder.DropColumn(
                name: "QualityReviewId",
                table: "Attachments");

            migrationBuilder.RenameTable(
                name: "QualityReviews",
                newName: "QualityReview");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReviewId",
                table: "Attachments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QualityReview",
                table: "QualityReview",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_ReviewId",
                table: "Attachments",
                column: "ReviewId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_QualityReview_ReviewId",
                table: "Attachments",
                column: "ReviewId",
                principalTable: "QualityReview",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QualityReview_WorkOrders_Id",
                table: "QualityReview",
                column: "Id",
                principalTable: "WorkOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
