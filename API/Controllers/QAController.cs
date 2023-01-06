using Application.QA;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class QAController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetWorkOrders([FromQuery] WorkOrderParams param)
        {
            var result = await Mediator.Send(new List.Query{Params = param});
            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReview(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> Review([FromForm] QACreateDto review)
        {
            return HandleResult(await Mediator.Send(new Create.Command {QA = review}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReview(Guid id, [FromForm] QACreateDto review)
        {
            review.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {QA = review}));
        }
    }
}