using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.QA
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public QACreateDto QA { get; set; }
        }

        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.WorkOrder).SetValidator(new WorkOrderValidator());
        //     }
        // }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IWebHostEnvironment _environment;
            public Handler(DataContext context, IMapper mapper, IWebHostEnvironment environment)
            {
                _environment = environment;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var workOrder = await _context.WorkOrders.Where(w => w.Job == Int32.Parse(request.QA.Job)).FirstOrDefaultAsync();
                var qa = new QualityReview();
                _mapper.Map(request.QA, qa);
                qa.WorkOrder = workOrder;
                qa.DateOfAudit = DateTime.Parse(request.QA.DateOfAudit);
                qa.GlobalRework = request.QA.GlobalRework.ToLower() == "true";
                qa.OMSAvailable = request.QA.OMSAvailable.ToLower() == "true";
                qa.CorrectToolAvailableAndCalibrated = request.QA.CorrectToolAvailableAndCalibrated.ToLower() == "true";
                qa.ZebraTestUtilityAvailable = request.QA.ZebraTestUtilityAvailable.ToLower() == "true";
                qa.SNAllTestsPass = request.QA.SNAllTestsPass.ToLower() == "true";
                qa.TestUtilityUnitLabelBoxLabel = request.QA.TestUtilityUnitLabelBoxLabel.ToLower() == "true";
                qa.FollowedESDRequirement = request.QA.FollowedESDRequirement.ToLower() == "true";
                qa.FAICompletedWithPass = request.QA.FAICompletedWithPass.ToLower() == "true";
                qa.QualityOfLabel = request.QA.QualityOfLabel.ToLower() == "true";
                qa.IssueDocumented = request.QA.IssueDocumented.ToLower() == "true";
                qa.PackingProcess = request.QA.PackingProcess.ToLower() == "true";
                _context.QualityReviews.Add(qa);
                if (request.QA.FAIAndLAIEvidence != null)
                {
                    string path = Path.Combine(_environment.WebRootPath, request.QA.Job.ToString());
                    Directory.CreateDirectory(path);
                    string filePath = Path.Combine(path, "FAIAndLAIEvidence" + request.QA.FAIAndLAIEvidence.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.QA.FAIAndLAIEvidence.CopyToAsync(fileStream);
                    }
                    _context.Attachments.Add(AddAttachment(filePath, "FAIAndLAIEvidence", request.QA.Id));
                }
                if (request.QA.PictureOfUnitAndPODLabel != null)
                {
                    string path = Path.Combine(_environment.WebRootPath, request.QA.Job.ToString());
                    Directory.CreateDirectory(path);
                    string filePath = Path.Combine(path, "PictureOfUnitAndPODLabel" + request.QA.PictureOfUnitAndPODLabel.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.QA.PictureOfUnitAndPODLabel.CopyToAsync(fileStream);
                    }
                    _context.Attachments.Add(AddAttachment(filePath, "PictureOfUnitAndPODLabel", request.QA.Id));
                }
                if (request.QA.PackingPicture != null)
                {
                    string path = Path.Combine(_environment.WebRootPath, request.QA.Job.ToString());
                    Directory.CreateDirectory(path);
                    string filePath = Path.Combine(path, "PackingPicture" + request.QA.PackingPicture.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.QA.PackingPicture.CopyToAsync(fileStream);
                    }
                    _context.Attachments.Add(AddAttachment(filePath, "PackingPicture", request.QA.Id));
                }
                if (request.QA.EvidenceOfIssuesReported != null)
                {
                    string path = Path.Combine(_environment.WebRootPath, request.QA.Job.ToString());
                    Directory.CreateDirectory(path);
                    string filePath = Path.Combine(path, "EvidenceOfIssuesReported" + request.QA.EvidenceOfIssuesReported.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.QA.EvidenceOfIssuesReported.CopyToAsync(fileStream);
                    }
                    _context.Attachments.Add(AddAttachment(filePath, "EvidenceOfIssuesReported", request.QA.Id));
                }
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create review");
                return Result<Unit>.Success(Unit.Value);
            }

            private Attachment AddAttachment(string path, string type, Guid qaId)
            {
                return new Attachment
                {
                    Id = Guid.NewGuid(),
                    AttachmentType = type,
                    Path = path,
                    ReviewId = qaId
                };
            }
        }
    }
}