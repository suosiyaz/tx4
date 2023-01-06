import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Grid, Header, Label, Radio, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { QAReviewFormValues } from '../../../app/models/qaReview';
import { useParams } from 'react-router-dom';
import MySelectInput from '../../../app/common/form/MySelectInput';

export default observer(function QAReviewForm() {
    const { reviewStore } = useStore();
    const { reviewQuality, selectedWorkOrderForReview, loadReview, clearSelectedReview, updateReview } = reviewStore;
    const { id } = useParams<{ id: string }>();

    const [globalRework, setGlobalRework] = useState<boolean>(false);
    const [omsAvailable, setOMSAvailable] = useState<boolean>(false);
    const [correctToolAvailableAndCalibrated, setCorrectToolAvailableAndCalibrated] = useState<boolean>(false);
    const [zebraTestUtilityAvailable, setZebraTestUtilityAvailable] = useState<boolean>(false);
    const [snAllTestsPass, setSNAllTestsPass] = useState<boolean>(false);
    const [testUtilityUnitLabelBoxLabel, setTestUtilityUnitLabelBoxLabel] = useState<boolean>(false);
    const [followedESDRequirement, setFollowedESDRequirement] = useState<boolean>(false);
    const [faiCompletedWithPass, setFAICompletedWithPass] = useState<boolean>(false);
    const [qualityOfLabel, setQualityOfLabel] = useState<boolean>(false);
    const [issueDocumented, setIssueDocumented] = useState<boolean>(false);
    const [packingProcess, setPackingProcess] = useState<boolean>(false);
    const [verificationStatus, setVerificationStatus] = useState<string>('');

    const shiftOptions = [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' }
    ]

    useEffect(() => {
        if (id) loadReview(id);
        return () => clearSelectedReview();

    }, [id, loadReview, clearSelectedReview]);

    useEffect(() => {
        if (selectedWorkOrderForReview) {
            setGlobalRework(selectedWorkOrderForReview.globalRework);
            setOMSAvailable(selectedWorkOrderForReview.omsAvailable);
            setCorrectToolAvailableAndCalibrated(selectedWorkOrderForReview.correctToolAvailableAndCalibrated);
            setZebraTestUtilityAvailable(selectedWorkOrderForReview.zebraTestUtilityAvailable);
            setSNAllTestsPass(selectedWorkOrderForReview.snAllTestsPass);
            setTestUtilityUnitLabelBoxLabel(selectedWorkOrderForReview.testUtilityUnitLabelBoxLabel);
            setFollowedESDRequirement(selectedWorkOrderForReview.followedESDRequirement);
            setFAICompletedWithPass(selectedWorkOrderForReview.faiCompletedWithPass);
            setQualityOfLabel(selectedWorkOrderForReview.qualityOfLabel);
            setIssueDocumented(selectedWorkOrderForReview.issueDocumented);
            setPackingProcess(selectedWorkOrderForReview.packingProcess);
            setVerificationStatus(selectedWorkOrderForReview.verificationStatus);
        }
    }, [selectedWorkOrderForReview])

    const validationSchema = Yup.object({
        job: Yup.string().required('Work Order is required')
    })

    function handleFormSubmit(review: QAReviewFormValues) {
        review.globalRework = globalRework;
        review.omsAvailable = omsAvailable;
        review.correctToolAvailableAndCalibrated = correctToolAvailableAndCalibrated;
        review.zebraTestUtilityAvailable = zebraTestUtilityAvailable;
        review.snAllTestsPass = snAllTestsPass;
        review.testUtilityUnitLabelBoxLabel = testUtilityUnitLabelBoxLabel;
        review.followedESDRequirement = followedESDRequirement;
        review.faiCompletedWithPass = faiCompletedWithPass;
        review.qualityOfLabel = qualityOfLabel;
        review.issueDocumented = issueDocumented;
        review.packingProcess = packingProcess;
        review.verificationStatus = verificationStatus;

        if (!review.id || review.id === '00000000-0000-0000-0000-000000000000') {
            let newReview = {
                ...review,
                id: uuid()
            };
            reviewQuality(newReview);
        } else {
            updateReview(review);
        }
    }

    return (
        <>
            <Segment.Group
                attached='top'
                horizontal
                style={{ border: 'none' }}
            >
                <Segment color='teal' inverted textAlign='center' style={{ border: 'none', width: '95%' }}>
                    <Header>Review Work Order Quality</Header>
                </Segment>
            </Segment.Group>
            <Segment clearing attached>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={selectedWorkOrderForReview ? Object.assign(QAReviewFormValues, selectedWorkOrderForReview) : new QAReviewFormValues()}
                    onSubmit={(values, { resetForm }) => { handleFormSubmit(values); resetForm(); }}>
                    {({ handleSubmit, isValid, isSubmitting, dirty, resetForm, setFieldValue }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <Grid>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='WIP Job' color='teal' />
                                    <MyTextInput name='job' placeholder='WIP Job' disabled={true} />
                                    <Header as='h4' content='Assembly Number' color='teal' />
                                    <MyTextInput name='assembly' placeholder='Assembly Number' disabled={true} />
                                    <Header as='h4' content='OMS Available' color='teal' />
                                    <Label horizontal color={!omsAvailable ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setOMSAvailable(false)} />
                                    <Checkbox name='omsAvailable' slider checked={omsAvailable} onChange={(e, { checked }) => { setOMSAvailable(checked!); setFieldValue('omsAvailable', checked) }} />
                                    <Label horizontal color={omsAvailable ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setOMSAvailable(true)} />
                                    <Header as='h4' content='Test Utility Unit Label vs Box Label' color='teal' />
                                    <Label horizontal color={!testUtilityUnitLabelBoxLabel ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setTestUtilityUnitLabelBoxLabel(false)} />
                                    <Checkbox name='testUtilityUnitLabelBoxLabel' slider checked={testUtilityUnitLabelBoxLabel} onChange={(e, { checked }) => { setTestUtilityUnitLabelBoxLabel(checked!); setFieldValue('testUtilityUnitLabelBoxLabel', checked) }} />
                                    <Label horizontal color={testUtilityUnitLabelBoxLabel ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setTestUtilityUnitLabelBoxLabel(true)} />
                                    <Header as='h4' content='Quality Of Label' color='teal' />
                                    <Label horizontal color={!qualityOfLabel ? 'red' : 'grey'} basic content='Not Good' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setQualityOfLabel(false)} />
                                    <Checkbox name='qualityOfLabel' slider checked={qualityOfLabel} onChange={(e, { checked }) => { setQualityOfLabel(checked!); setFieldValue('qualityOfLabel', checked) }} />
                                    <Label horizontal color={qualityOfLabel ? 'green' : 'grey'} basic content='Good' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setQualityOfLabel(true)} />
                                    <Header as='h4' content='Issue Documented' color='teal' />
                                    <Label horizontal color={!issueDocumented ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setIssueDocumented(false)} />
                                    <Checkbox name='issueDocumented' slider checked={issueDocumented} onChange={(e, { checked }) => { setIssueDocumented(checked!); setFieldValue('issueDocumented', checked) }} />
                                    <Label horizontal color={issueDocumented ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setIssueDocumented(true)} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Auditor Name' color='teal' />
                                    <MyTextInput name='auditorName' placeholder='Auditor Name' />
                                    <Header as='h4' content='Device Serial #' color='teal' />
                                    <MyTextInput name='deviceSerialNumber' placeholder='Device Serial #' />
                                    <Header as='h4' content='Correct Tool Available And Calibrated' color='teal' />
                                    <Label horizontal color={!correctToolAvailableAndCalibrated ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setCorrectToolAvailableAndCalibrated(false)} />
                                    <Checkbox name='correctToolAvailableAndCalibrated' slider checked={correctToolAvailableAndCalibrated} onChange={(e, { checked }) => { setCorrectToolAvailableAndCalibrated(checked!); setFieldValue('correctToolAvailableAndCalibrated', checked) }} />
                                    <Label horizontal color={correctToolAvailableAndCalibrated ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setCorrectToolAvailableAndCalibrated(true)} />
                                    <Header as='h4' content='Shift' color='teal' />
                                    <MySelectInput name='shift' placeholder='Shift' options={shiftOptions} />
                                    <Header as='h4' content='FAI And LAI Evidence' color='teal' />
                                    <input name='faiAndLAIEvidence' type='file' onChange={(event) => { setFieldValue('faiAndLAIEvidence', event.currentTarget.files![0]) }} />
                                    <Header as='h4' content='Packing Process' color='teal' />
                                    <Label horizontal color={!packingProcess ? 'red' : 'grey'} basic content='Not Good' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setPackingProcess(false)} />
                                    <Checkbox name='packingProcess' slider checked={packingProcess} onChange={(e, { checked }) => { setPackingProcess(checked!); setFieldValue('packingProcess', checked) }} />
                                    <Label horizontal color={packingProcess ? 'green' : 'grey'} basic content='Good' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setPackingProcess(true)} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Date of Audit' color='teal' />
                                    <MyDateInput name='dateOfAudit' placeholderText='Date of Audit' />
                                    <Header as='h4' content='Global Rework(GR)' color='teal' />
                                    <Label horizontal color={!globalRework ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setGlobalRework(false)} />
                                    <Checkbox name='globalRework' slider checked={globalRework} onChange={(e, { checked }) => { setGlobalRework(checked!); setFieldValue('globalRework', checked) }} />
                                    <Label horizontal color={globalRework ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setGlobalRework(true)} />
                                    <Header as='h4' content='Zebra Test Utility Available' color='teal' />
                                    <Label horizontal color={!zebraTestUtilityAvailable ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setZebraTestUtilityAvailable(false)} />
                                    <Checkbox name='zebraTestUtilityAvailable' slider checked={zebraTestUtilityAvailable} onChange={(e, { checked }) => { setZebraTestUtilityAvailable(checked!); setFieldValue('zebraTestUtilityAvailable', checked) }} />
                                    <Label horizontal color={zebraTestUtilityAvailable ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setZebraTestUtilityAvailable(true)} />
                                    <Header as='h4' content='Followed ESD Requirement' color='teal' />
                                    <Label horizontal color={!followedESDRequirement ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setFollowedESDRequirement(false)} />
                                    <Checkbox name='followedESDRequirement' slider checked={followedESDRequirement} onChange={(e, { checked }) => { setFollowedESDRequirement(checked!); setFieldValue('followedESDRequirement', checked) }} />
                                    <Label horizontal color={followedESDRequirement ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setFollowedESDRequirement(true)} />
                                    <Header as='h4' content='Picture Of Unit And POD Label' color='teal' />
                                    <input name='pictureOfUnitAndPODLabel' type='file' onChange={(event) => { setFieldValue('pictureOfUnitAndPODLabel', event.currentTarget.files![0]) }} />
                                    <Header as='h4' content='Issue Description' color='teal' />
                                    <MyTextInput name='issueDescription' placeholder='Issue Description' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Product Family' color='teal' />
                                    <MyTextInput name='prodLine' placeholder='Product Family' disabled={true} />
                                    <Header as='h4' content='GR Number' color='teal' />
                                    <MyTextInput name='grNumber' placeholder='GR Number' />
                                    <Header as='h4' content='SN All Tests Pass' color='teal' />
                                    <Label horizontal color={!snAllTestsPass ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setSNAllTestsPass(false)} />
                                    <Checkbox name='snAllTestsPass' slider checked={snAllTestsPass} onChange={(e, { checked }) => { setSNAllTestsPass(checked!); setFieldValue('snAllTestsPass', checked) }} />
                                    <Label horizontal color={snAllTestsPass ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setSNAllTestsPass(true)} />
                                    <Header as='h4' content='FAI Completed With Pass' color='teal' />
                                    <Label horizontal color={!faiCompletedWithPass ? 'red' : 'grey'} basic content='No' style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => setFAICompletedWithPass(false)} />
                                    <Checkbox name='faiCompletedWithPass' slider checked={faiCompletedWithPass} onChange={(e, { checked }) => { setFAICompletedWithPass(checked!); setFieldValue('faiCompletedWithPass', checked) }} />
                                    <Label horizontal color={faiCompletedWithPass ? 'green' : 'grey'} basic content='Yes' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setFAICompletedWithPass(true)} />
                                    <Header as='h4' content='Packing Picture' color='teal' />
                                    <input name='packingPicture' type='file' onChange={(event) => { setFieldValue('packingPicture', event.currentTarget.files![0]) }} />
                                    <Header as='h4' content='Evidence Of Issues Reported' color='teal' />
                                    <input name='evidenceOfIssuesReported' type='file' onChange={(event) => { setFieldValue('evidenceOfIssuesReported', event.currentTarget.files![0]) }} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as='h4' content='Verification Status' color='teal' />
                                    <Radio value='pass' name='verificationStatus' checked={verificationStatus === 'pass'} onChange={(e, { value }) => { setVerificationStatus(value!.toString()); setFieldValue('verificationStatus', value) }} />
                                    <Label horizontal color={verificationStatus === 'pass' ? 'green' : 'grey'} content='Pass' size='large' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setVerificationStatus('pass')} />
                                    <Radio value='passWithIssue' name='verificationStatus' checked={verificationStatus === 'passWithIssue'} onChange={(e, { value }) => { setVerificationStatus(value!.toString()); setFieldValue('verificationStatus', value) }} style={{ marginLeft: '1rem' }} />
                                    <Label horizontal color={verificationStatus === 'passWithIssue' ? 'orange' : 'grey'} content='Pass with minor issue' size='large' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setVerificationStatus('passWithIssue')} />
                                    <Radio value='fail' name='verificationStatus' checked={verificationStatus === 'fail'} onChange={(e, { value }) => { setVerificationStatus(value!.toString()); setFieldValue('verificationStatus', value) }} style={{ marginLeft: '1rem' }} />
                                    <Label horizontal color={verificationStatus === 'fail' ? 'red' : 'grey'} content='Fail' size='large' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setVerificationStatus('fail')} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Button.Group floated='right'>
                                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' primary type='submit' content='Submit' />
                                        <Button.Or />
                                        <Button floated='right' type='button' content='Cancel' onClick={() => { resetForm() }} />
                                    </Button.Group>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </>
    )
})