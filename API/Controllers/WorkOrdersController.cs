using Application.WorkOrders;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WorkOrdersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetWorkOrders([FromQuery] WorkOrderParams param)
        {
            var result = await Mediator.Send(new List.Query{Params = param});
            return HandlePagedResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkOrder(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkOrder(WorkOrderCreateDto workOrder)
        {
            return HandleResult(await Mediator.Send(new Create.Command {WorkOrder = workOrder}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditWorkOrder(Guid id, WorkOrderCreateDto workOrder)
        {
            workOrder.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {WorkOrder = workOrder}));
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkOrder(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [HttpGet("report")]
        public async Task<IActionResult> GetReport(string reportName)
        {
            var result = await Mediator.Send(new Report.Query{ReportName = reportName});
            return HandleResult(result);
        }
    }
}