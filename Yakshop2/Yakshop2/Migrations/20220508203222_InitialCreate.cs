using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yakshop2.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Herds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Herds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Yaks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Age = table.Column<double>(type: "float", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HerdId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Yaks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Yaks_Herds_HerdId",
                        column: x => x.HerdId,
                        principalTable: "Herds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Yaks_HerdId",
                table: "Yaks",
                column: "HerdId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Yaks");

            migrationBuilder.DropTable(
                name: "Herds");
        }
    }
}
