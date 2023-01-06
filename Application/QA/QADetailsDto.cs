namespace Application.QA
{
    public class QADetailsDto
    {
        public Guid Id { get; set; }
        public int Job { get; set; }
        public string AuditorName { get; set; }
        public DateTime? DateOfAudit { get; set; }
        public string ProdLine { get; set; }
        public string Assembly { get; set; }
        public string DeviceSerialNumber { get; set; }
        public bool GlobalRework { get; set; }
        public string GRNumber { get; set; }
        public bool OMSAvailable { get; set; }
        public bool CorrectToolAvailableAndCalibrated { get; set; }
        public bool ZebraTestUtilityAvailable { get; set; }
        public bool SNAllTestsPass { get; set; }
        public bool TestUtilityUnitLabelBoxLabel { get; set; }
        public string Shift { get; set; }
        public bool FollowedESDRequirement { get; set; }
        public bool FAICompletedWithPass { get; set; }
        public bool QualityOfLabel { get; set; }
        public bool IssueDocumented { get; set; }
        public bool PackingProcess { get; set; }
        public string IssueDescription { get; set; }  
        public string MyProperty { get; set; }
        public string VerificationStatus { get; set; }
    }
}