import { Formik } from 'formik';
import { Button, Form, Grid, Header, Label, Segment } from 'semantic-ui-react';
import MyDateInput from '../../../../app/common/form/MyDateInput';
import MySelectInput from '../../../../app/common/form/MySelectInput';
import MyTextInput from '../../../../app/common/form/MyTextInput';
import { OrderTypeOptions } from '../../../../app/common/options/orderTypeOptions';
import { WorkOrder } from '../../../../app/models/workOrder';
import * as Yup from 'yup';
import { useStore } from '../../../../app/stores/store';
import { ProdLineOptions } from '../../../../app/common/options/prodLineOptions';
import { StatusOptions } from '../../../../app/common/options/statusOptions';
import { ReconfigurationStatusOptions } from '../../../../app/common/options/reconfigurationStatusOptions';
import { observer } from 'mobx-react-lite';

export default observer(function ReconfigureForm() {
    const { workOrderStore, modalStore } = useStore();
    const { selectedWorkOrder, reconfigureWorkOrder } = workOrderStore;

    const validationSchema = Yup.object({
        job: Yup.string().required('Work Order is required'),
        type: Yup.string().required(),
        orderQuantity: Yup.string().required(),
        assembly: Yup.string().required(),
        prodLine: Yup.string().required(),
        class: Yup.string().required(),
        hotOrder: Yup.string().required(),
        organization: Yup.string().required()
    })

    function handleFormSubmit(workOrder: WorkOrder) {
        reconfigureWorkOrder(workOrder);
    }

    return (
        <>
            <Segment attached>
                {selectedWorkOrder && selectedWorkOrder.hotOrder &&
                    <Label attached='top' as='h4' color='red' content='Hot Order' style={{ textAlign: 'center' }} />
                }
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={selectedWorkOrder!}
                    onSubmit={(values, { resetForm }) => { handleFormSubmit(values); resetForm(); }}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <Grid>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Work Order' color='teal' />
                                    <MyTextInput name='job' placeholder='Work Order' />
                                    <Header as='h4' content='Work Order Quantity' color='teal' />
                                    <MyTextInput name='orderQuantity' type='number' placeholder='Work Order Quantity' />
                                    <Header as='h4' content='Completion Date' color='teal' />
                                    <MyDateInput name='completionDate' placeholderText='Completion Date' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Wor Order Status' color='teal' />
                                    <MySelectInput name='orderStatus' placeholder='Order Status' options={StatusOptions} />
                                    <Header as='h4' content='Start Date' color='teal' />
                                    <MyDateInput name='startDate' placeholderText='Start Date' />
                                    <Header as='h4' content='Product Line / Family' color='teal' />
                                    <MySelectInput name='prodLine' placeholder='Product Line / Family' options={ProdLineOptions} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Released Date' color='teal' />
                                    <MyDateInput name='dateReleased' placeholderText='Released Date' />
                                    <Header as='h4' content='Assembly' color='teal' />
                                    <MyTextInput name='assembly' placeholder='Assembly' />
                                    <Header as='h4' content='Remaining Quantity' color='teal' />
                                    <MyTextInput name='pendingQuantity' type='number' placeholder='Remaining Quantity' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Order Type' color='teal' />
                                    <MySelectInput name='type' placeholder='Order Type' options={OrderTypeOptions} />
                                    <Header as='h4' content='Completed Quantity' color='teal' />
                                    <MyTextInput name='completedQuantity' type='number' placeholder='Completed Quantity' />
                                    <Header as='h4' content='Work Order Age' color='teal' />
                                    <MyTextInput name='aged' type='number' placeholder='Work Order Age' />
                                </Grid.Column>
                            </Grid>
                            <Segment clearing>
                                <Grid>
                                    <Grid.Column width={5}>
                                        <Header as='h4' content='Order Processing Line' color='teal' />
                                        <MyTextInput name='orderProcessingLine' placeholder='Order Processing Line' />
                                        <Header as='h4' content='Expected Completion Date' color='teal' />
                                        <MyDateInput name='expectedCompletionDate' placeholderText='Expected Completion Date' />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Header as='h4' content='Reconfiguration Status' color='teal' />
                                        <MySelectInput name='reconfigurationStatus' placeholder='Reconfiguration Status' options={ReconfigurationStatusOptions} />
                                        <Header as='h4' content='Order Split Child WO Created' color='teal' />
                                        <MyTextInput name='orderSplitChildWOCreated' placeholder='Order Split Child WO Created' />
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Header as='h4' content='Help Required From' color='teal' />
                                        <MyTextInput name='helpRequiredFrom' placeholder='Help Required From' />
                                        <Header as='h4' content='Additional Comments' color='teal' />
                                        <MyTextInput name='additionalComments' placeholder='Additional Comments' />
                                    </Grid.Column>
                                    <Grid.Column width={16} textAlign='center'>
                                        <Button.Group>
                                            <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Save' type='submit' fluid />
                                            <Button.Or />
                                            <Button disabled={isSubmitting} content='Close' type='button' fluid onClick={modalStore.closeModal} />
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </>
    )
})