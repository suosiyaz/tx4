using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkOrders
{
    public class Reconfigure
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorkOrderReconfigureDto WorkOrder { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var workOrder = await _context.WorkOrders.FindAsync(request.WorkOrder.Id);
                if (workOrder == null) return null;
                _mapper.Map(request.WorkOrder, workOrder);
                var changes = _context.ChangeTracker.Entries().Where(e => e.State == EntityState.Modified).ToList();
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var history = new WorkOrderHistory();
                history.Comments = workOrder.AdditionalComments;
                history.Id = Guid.NewGuid();
                history.UpdatedOn = DateTime.Now;
                history.User = user;
                history.WorkOrder = workOrder;
                foreach (var change in changes)
                {
                    int count = 0;
                    foreach (var prop in change.OriginalValues.Properties)
                    {
                        string originalValue = null;
                        string currentValue = null;
                        var check = prop.GetType();
                        var check1 = check.Equals(typeof(DateTime));
                        string[] dateColumns = {"DateReleased", "StartDate", "CompletionDate", "ScheduleToRelease", "ExpectedCompletionDate"};
                        if (dateColumns.Any(d => d == prop.Name))
                        {
                            originalValue = change.OriginalValues[prop] == null ? null : DateTime.Parse(change.OriginalValues[prop].ToString()).Date.ToString();
                            currentValue = change.CurrentValues[prop] == null ? null : DateTime.Parse(change.CurrentValues[prop].ToString()).Date.ToString();
                        }
                        else
                        {
                            originalValue = change.OriginalValues[prop] == null ? null : change.OriginalValues[prop].ToString();
                            currentValue = change.CurrentValues[prop] == null ? null : change.CurrentValues[prop].ToString();
                        }
                        if (originalValue != currentValue)
                        {
                            if (count == 0) history.CourseOfAction = prop.Name.ToString() + ": changed from '" + originalValue + "' to '" + currentValue + "'";
                            else history.CourseOfAction = history.CourseOfAction + ", " + prop.Name.ToString() + ": changed from '" + originalValue + "' to '" + currentValue + "'";
                            count = 1;
                        }
                    }
                }
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update work order");
                _context.WorkOrderHistories.Add(history);
                result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to add history");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}