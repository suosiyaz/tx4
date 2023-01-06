using Microsoft.AspNetCore.Http;

namespace Application.QA
{
    public class QACreateDto
    {
        public Guid Id { get; set; }
        public string Job { get; set; }
        public string AuditorName { get; set; }
        public string DateOfAudit { get; set; }
        public string ProdLine { get; set; }
        public string Assembly { get; set; }
        public string DeviceSerialNumber { get; set; }
        public string GlobalRework { get; set; }
        public string GRNumber { get; set; }
        public string OMSAvailable { get; set; }
        public string CorrectToolAvailableAndCalibrated { get; set; }
        public string ZebraTestUtilityAvailable { get; set; }
        public string SNAllTestsPass { get; set; }
        public string TestUtilityUnitLabelBoxLabel { get; set; }
        public string Shift { get; set; }
        public string FollowedESDRequirement { get; set; }
        public string FAICompletedWithPass { get; set; }
        public string QualityOfLabel { get; set; }
        public string IssueDocumented { get; set; }
        public string PackingProcess { get; set; }
        public string IssueDescription { get; set; }  
        public string MyProperty { get; set; }
        public string VerificationStatus { get; set; }
        public IFormFile FAIAndLAIEvidence { get; set; }
        public IFormFile PictureOfUnitAndPODLabel { get; set; }
        public IFormFile PackingPicture { get; set; }
        public IFormFile EvidenceOfIssuesReported { get; set; }
    }
}