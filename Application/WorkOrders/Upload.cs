using System.Data;
using Application.Core;
using AutoMapper;
using Domain;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.WorkOrders
{
    public class Upload
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.File == null) return null;

                var stream = new MemoryStream();
                await request.File.CopyToAsync(stream);

                IExcelDataReader reader = null;
                DataSet excelRecords = new DataSet();

                if (request.File.FileName.EndsWith(".xls"))
                    reader = ExcelReaderFactory.CreateBinaryReader(stream);
                else if (request.File.FileName.EndsWith(".xlsx"))
                    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                else return Result<Unit>.Failure("The file format is not supported");

                excelRecords = reader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true
                    }
                });
                reader.Close();

                DataTable dtWorkOrders = excelRecords.Tables[0];
                for (int i = 0; i < dtWorkOrders.Rows.Count; i++)
                {
                    var workOrder = new WorkOrder();
                    workOrder.Job = Convert.ToInt32(dtWorkOrders.Rows[i]["Work Order"]);
                    workOrder.DateReleased = Convert.ToDateTime(dtWorkOrders.Rows[i]["Release Date"]);
                    workOrder.Type = Convert.ToString(dtWorkOrders.Rows[i]["Order Type"]);
                    workOrder.OrderQuantity = Convert.ToInt32(dtWorkOrders.Rows[i]["Work Order Quantity"]);
                    workOrder.StartDate = Convert.ToDateTime(dtWorkOrders.Rows[i]["Start Date"]);
                    workOrder.Assembly = Convert.ToString(dtWorkOrders.Rows[i]["Assembly"]);
                    workOrder.CompletionDate = dtWorkOrders.Rows[i]["Completion Date"] == DBNull.Value ? null : Convert.ToDateTime(dtWorkOrders.Rows[i]["Completion Date"]);
                    workOrder.ProdLine = Convert.ToString(dtWorkOrders.Rows[i]["Product Line / Family"]);
                    workOrder.ScheduleToRelease = dtWorkOrders.Rows[i]["Schedule To Release"] == DBNull.Value ? null : Convert.ToDateTime(dtWorkOrders.Rows[i]["Schedule To Release"]);
                    workOrder.Class = Convert.ToString(dtWorkOrders.Rows[i]["Class"]);
                    workOrder.ParentJob = dtWorkOrders.Rows[i]["Parent WO Number"] == DBNull.Value ? null : Convert.ToInt32(dtWorkOrders.Rows[i]["Parent WO Number"]);
                    workOrder.Organization = Convert.ToString(dtWorkOrders.Rows[i]["Organization"]);
                    workOrder.HotOrder = Convert.ToString(dtWorkOrders.Rows[i]["Hot Order"]) == "Yes" ? true : false;
                    workOrder.OrderStatus = Convert.ToString(dtWorkOrders.Rows[i]["Save / Release"]) == "Save" ? "Saved" : "Released";
                    _mapper.Map(workOrder, workOrder);
                    _context.WorkOrders.Add(workOrder);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem uploading data");
            }
        }
    }
}