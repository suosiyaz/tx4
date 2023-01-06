using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class UpdatedQAEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuantityReviewDate",
                table: "QualityReview",
                newName: "DateOfAudit");

            migrationBuilder.RenameColumn(
                name: "IssuesDocumented",
                table: "QualityReview",
                newName: "ZebraTestUtilityAvailable");

            migrationBuilder.RenameColumn(
                name: "FAIPassed",
                table: "QualityReview",
                newName: "TestUtilityUnitLabelBoxLabel");

            migrationBuilder.AlterColumn<bool>(
                name: "GlobalRework",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "AuditorName",
                table: "QualityReview",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CorrectToolAvailableAndCalibrated",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "FAICompletedWithPass",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "FollowedESDRequirement",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "GRNumber",
                table: "QualityReview",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IssueDocumented",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "MyProperty",
                table: "QualityReview",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "OMSAvailable",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PackingProcess",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "QualityOfLabel",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "SNAllTestsPass",
                table: "QualityReview",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Shift",
                table: "QualityReview",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AttachmentType",
                table: "Attachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_Job",
                table: "WorkOrders",
                column: "Job",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WorkOrders_Job",
                table: "WorkOrders");

            migrationBuilder.DropColumn(
                name: "AuditorName",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "CorrectToolAvailableAndCalibrated",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "FAICompletedWithPass",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "FollowedESDRequirement",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "GRNumber",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "IssueDocumented",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "OMSAvailable",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "PackingProcess",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "QualityOfLabel",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "SNAllTestsPass",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "Shift",
                table: "QualityReview");

            migrationBuilder.DropColumn(
                name: "AttachmentType",
                table: "Attachments");

            migrationBuilder.RenameColumn(
                name: "ZebraTestUtilityAvailable",
                table: "QualityReview",
                newName: "IssuesDocumented");

            migrationBuilder.RenameColumn(
                name: "TestUtilityUnitLabelBoxLabel",
                table: "QualityReview",
                newName: "FAIPassed");

            migrationBuilder.RenameColumn(
                name: "DateOfAudit",
                table: "QualityReview",
                newName: "QuantityReviewDate");

            migrationBuilder.AlterColumn<int>(
                name: "GlobalRework",
                table: "QualityReview",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
