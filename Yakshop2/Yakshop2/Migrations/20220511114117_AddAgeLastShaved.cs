using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yakshop2.Migrations
{
    public partial class AddAgeLastShaved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ageLastShaved",
                table: "Yaks",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Stock",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Milk = table.Column<double>(type: "float", nullable: false),
                    Skins = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stock");

            migrationBuilder.DropColumn(
                name: "ageLastShaved",
                table: "Yaks");
        }
    }
}
