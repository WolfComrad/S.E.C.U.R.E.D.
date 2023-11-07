using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SECURED_WEB.Migrations
{
    /// <inheritdoc />
    public partial class AddedKeyColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Private_Key",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Public_Key",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Private_Key",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Public_Key",
                table: "AspNetUsers");
        }
    }
}
