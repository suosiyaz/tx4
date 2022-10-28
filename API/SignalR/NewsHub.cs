using Application.HotNewses;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class NewsHub : Hub
    {
        private readonly IMediator _mediator;
        public NewsHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendNews(Create.Command command)
        {
            var news = await _mediator.Send(command);

            await Clients.Group("All Active").SendAsync("ReceiveNews", news.Value);
        }
        public async Task UpdateNews(Edit.Command command)
        {
            var news = await _mediator.Send(command);

            await Clients.Group("All Active").SendAsync("ReceiveNews", news.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            await Groups.AddToGroupAsync(Context.ConnectionId, "All Active");
            var result = await _mediator.Send(new List.Query());
            await Clients.Caller.SendAsync("LoadNews", result.Value);
        }
    }
}