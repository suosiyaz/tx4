export interface QAReview {
    id: string;
    job: number;
    auditorName: string;
    dateOfAudit: Date | undefined;
    prodLine: string;
    assembly: string;
    deviceSerialNumber: string;
    globalRework: boolean;
    grNumber: string;
    omsAvailable: boolean;
    correctToolAvailableAndCalibrated: boolean;
    zebraTestUtilityAvailable: boolean;
    snAllTestsPass: boolean;
    testUtilityUnitLabelBoxLabel: boolean;
    shift: string;
    followedESDRequirement: boolean;
    faiCompletedWithPass: boolean;
    qualityOfLabel: boolean;
    faiAndLAIEvidence: string | File;
    pictureOfUnitAndPODLabel: string | File;
    packingPicture: string | File;
    issueDocumented: boolean;
    packingProcess: boolean;
    issueDescription: string;
    evidenceOfIssuesReported: string | File;
    verificationStatus: string;
}

export class QAReview implements QAReview {
    constructor(init?: QAReviewFormValues) {
        Object.assign(this, init);
    }
}

export class QAReviewFormValues {
    id: string = '';
    job: number = 0;
    auditorName: string = '';
    dateOfAudit: Date | undefined = undefined;
    prodLine: string = '';
    assembly: string = '';
    deviceSerialNumber: string = '';
    globalRework: boolean = false;
    grNumber: string = '';
    omsAvailable: boolean = false;
    correctToolAvailableAndCalibrated: boolean = false;
    zebraTestUtilityAvailable: boolean = false;
    snAllTestsPass: boolean = false;
    testUtilityUnitLabelBoxLabel: boolean = false;
    shift: string = '';
    followedESDRequirement: boolean = false;
    faiCompletedWithPass: boolean = false;
    qualityOfLabel: boolean = false;
    faiAndLAIEvidence: string | File = '';
    pictureOfUnitAndPODLabel: string | File = '';
    packingPicture: string | File = '';
    issueDocumented: boolean = false;
    packingProcess: boolean = false;
    issueDescription: string = '';
    evidenceOfIssuesReported: string | File = '';
    verificationStatus: string = '';

    constructor(review?: QAReviewFormValues) {
        if (review) {
            this.id = review.id;
            this.job = review.job;
            this.auditorName = review.auditorName;
            this.dateOfAudit = review.dateOfAudit;
            this.prodLine = review.prodLine;
            this.assembly = review.assembly;
            this.deviceSerialNumber = review.deviceSerialNumber;
            this.globalRework = review.globalRework;
            this.grNumber = review.grNumber;
            this.omsAvailable = review.omsAvailable;
            this.correctToolAvailableAndCalibrated = review.correctToolAvailableAndCalibrated;
            this.zebraTestUtilityAvailable = review.zebraTestUtilityAvailable;
            this.snAllTestsPass = review.snAllTestsPass;
            this.testUtilityUnitLabelBoxLabel = review.testUtilityUnitLabelBoxLabel;
            this.shift = review.shift;
            this.followedESDRequirement = review.followedESDRequirement;
            this.faiCompletedWithPass = review.faiCompletedWithPass;
            this.qualityOfLabel = review.qualityOfLabel;
            this.faiAndLAIEvidence = review.faiAndLAIEvidence;
            this.pictureOfUnitAndPODLabel = review.pictureOfUnitAndPODLabel;
            this.packingPicture = review.packingPicture;
            this.issueDocumented = review.issueDocumented;
            this.packingProcess = review.packingProcess;
            this.issueDescription = review.issueDescription;
            this.evidenceOfIssuesReported = review.evidenceOfIssuesReported;
            this.verificationStatus =review.verificationStatus;
        }
    }
}