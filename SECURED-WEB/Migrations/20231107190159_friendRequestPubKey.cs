using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SECURED_WEB.Migrations
{
    /// <inheritdoc />
    public partial class friendRequestPubKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Pub_Key",
                table: "FriendRequest",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pub_Key",
                table: "FriendRequest");
        }
    }
}
