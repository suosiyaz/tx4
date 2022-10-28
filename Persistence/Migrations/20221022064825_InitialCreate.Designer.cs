﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20221022064825_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.3");

            modelBuilder.Entity("Domain.WorkOrder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<double>("Aged")
                        .HasColumnType("REAL");

                    b.Property<string>("Assembly")
                        .HasColumnType("TEXT");

                    b.Property<string>("Class")
                        .HasColumnType("TEXT");

                    b.Property<double>("Completed")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("CompletionDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateReleased")
                        .HasColumnType("TEXT");

                    b.Property<double>("Job")
                        .HasColumnType("REAL");

                    b.Property<double>("OrderQuantity")
                        .HasColumnType("REAL");

                    b.Property<string>("Organization")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProdLine")
                        .HasColumnType("TEXT");

                    b.Property<double>("Quantity")
                        .HasColumnType("REAL");

                    b.Property<bool>("SLABreached")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("WorkOrders");
                });
#pragma warning restore 612, 618
        }
    }
}
