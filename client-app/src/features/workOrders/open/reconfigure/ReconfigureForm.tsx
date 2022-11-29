import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Checkbox, Form, Grid, Header, Label, Segment } from 'semantic-ui-react';
import MyDateInput from '../../../../app/common/form/MyDateInput';
import MySelectInput from '../../../../app/common/form/MySelectInput';
import MyTextInput from '../../../../app/common/form/MyTextInput';
import { ClassOptions } from '../../../../app/common/options/classOptions';
import { OrderTypeOptions } from '../../../../app/common/options/orderTypeOptions';
import { WorkOrderFormValues } from '../../../../app/models/workOrder';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../../app/stores/store';
import { ProdLineOptions } from '../../../../app/common/options/prodLineOptions';
import { OrganizationOptions } from '../../../../app/common/options/organizationOptions';
import { StatusOptions } from '../../../../app/common/options/statusOptions';

export default function ReconfigureForm() {
    const { workOrderStore } = useStore();
    const { createWorkOrder, updateWorkOrder, loadWorkOrder, loadingInitial } = workOrderStore;
    const [workOrder, setWorkOrder] = useState<WorkOrderFormValues>(new WorkOrderFormValues());
    const [hotOrder, setHotOrder] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('Saved');

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

    function handleFormSubmit(workOrder: WorkOrderFormValues) {
        workOrder.orderStatus = status;
        workOrder.completedQuantity = 0;
        workOrder.pendingQuantity = workOrder.orderQuantity;
        workOrder.hotOrder = hotOrder;
        if (!workOrder.id) {
            let newWorkOrder = {
                ...workOrder,
                id: uuid()
            };
            console.log(workOrder);
            createWorkOrder(newWorkOrder);
        } else {
            updateWorkOrder(workOrder);
        }
    }

    return (
        <>
            <Segment attached>
                <Label attached='top' as='h4' color='red' content='Hot Order' style={{ textAlign: 'center' }} />
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={workOrder}
                    onSubmit={(values, { resetForm }) => { handleFormSubmit(values); resetForm(); }}>
                    {({ handleSubmit, isValid, isSubmitting, dirty, resetForm }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <Grid>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Work Order' color='teal' />
                                    <MyTextInput name='job' placeholder='Work Order' />
                                    <Header as='h4' content='Work Order Quantity' color='teal' />
                                    <MyTextInput name='orderQuantity' type='number' placeholder='Work Order Quantity' />
                                    <Header as='h4' content='Completion Date' color='teal' />
                                    <MyDateInput name='completionDate' placeholderText='Completion Date' />
                                    <Header as='h4' content='Schedule To Release' color='teal' />
                                    <MyDateInput name='scheduleToRelease' placeholderText='Schedule to Release' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Wor Order Status' color='teal' />
                                    <MySelectInput name='orderStatus' placeholder='Order Status' options={StatusOptions} />
                                    <Header as='h4' content='Start Date' color='teal' />
                                    <MyDateInput name='startDate' placeholderText='Start Date' />
                                    <Header as='h4' content='Product Line / Family' color='teal' />
                                    <MySelectInput name='prodLine' placeholder='Product Line / Family' options={ProdLineOptions} />
                                    <Header as='h4' content='Class' color='teal' />
                                    <MySelectInput name='class' placeholder='Class' options={ClassOptions} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Released Date' color='teal' />
                                    <MyDateInput name='dateReleased' placeholderText='Released Date' />
                                    <Header as='h4' content='Assembly' color='teal' />
                                    <MyTextInput name='assembly' placeholder='Assembly' />
                                    <Header as='h4' content='Remaining Quantity' color='teal' />
                                    <MyTextInput name='pendingQuantity' type='number' placeholder='Remaining Quantity' />
                                    <Header as='h4' content='Parent WO Number' color='teal' />
                                    <MyTextInput name='parentWONumber' placeholder='Parent WO Number' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Order Type' color='teal' />
                                    <MySelectInput name='type' placeholder='Order Type' options={OrderTypeOptions} />
                                    <Header as='h4' content='Completed Quantity' color='teal' />
                                    <MyTextInput name='completedQuantity' type='number' placeholder='Completed Quantity' />
                                    <Header as='h4' content='Work Order Age' color='teal' />
                                    <MyTextInput name='aged' type='number' placeholder='Work Order Age' />
                                    <Header as='h4' content='Organization' color='teal' />
                                    <MySelectInput name='organization' placeholder='Organization' options={OrganizationOptions} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Hot Order' color='teal' />
                                    <Checkbox slider onChange={(e, { checked }) => setHotOrder(checked!)} />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Button.Group floated='right'>
                                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='Save' />
                                        <Button.Or />
                                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' primary type='submit' content='Release' />
                                        <Button.Or />
                                        <Button floated='right' type='button' content='Cancel' onClick={() => resetForm} />
                                    </Button.Group>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </>
    )
}