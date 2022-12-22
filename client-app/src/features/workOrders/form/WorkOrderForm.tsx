import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Grid, Header, Icon, Popup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { WorkOrderFormValues } from '../../../app/models/workOrder';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { ProdLineOptions } from '../../../app/common/options/prodLineOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { OrderTypeOptions } from '../../../app/common/options/orderTypeOptions';
import { ClassOptions } from '../../../app/common/options/classOptions';
import { OrganizationOptions } from '../../../app/common/options/organizationOptions';
import SavedWorkOrdersTable from './SavedWorkOrdersTable';
import Dropzone from '../../../app/common/upload/DropZone';

export default observer(function WorkOrderForm() {
    const { workOrderStore, modalStore } = useStore();
    const { createWorkOrder, uploadWorkOrders, updateWorkOrder, selectedSavedWorkOrder, loadingInitial, clearSelectedSavedWorkOrders } = workOrderStore;
    const [status, setStatus] = useState<string>('Saved');
    const [hotOrder, setHotOrder] = useState<boolean>(false);

    useEffect(() => {
        if (selectedSavedWorkOrder) setHotOrder(selectedSavedWorkOrder.hotOrder);
    }, [selectedSavedWorkOrder])

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

    function uploadFile(file: File) {
        uploadWorkOrders(file).then(() => {
            modalStore.closeModal();
        });
    }

    if (loadingInitial) return <LoadingComponent content='Loading work order...' />

    return (
        <>
            <Segment.Group
                attached='top'
                horizontal
                style={{ border: 'none' }}
            >
                <Segment color='teal' inverted textAlign='center' style={{ border: 'none', width: '95%' }}>
                    <Header>Create or Upload Work Order</Header>
                </Segment>
                <Segment color='teal' inverted textAlign='left' style={{ border: 'none', width: '5%' }}>
                    <Popup trigger={<Icon name='upload' style={{ cursor: 'pointer'}} size='large' onClick={() => { modalStore.openModal(<Dropzone uploadFile={uploadFile} />, 'tiny') }} />} inverted position='top right' content='Upload excel'></Popup>
                </Segment>
            </Segment.Group>
            <Segment clearing attached>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={selectedSavedWorkOrder ? Object.assign(WorkOrderFormValues, selectedSavedWorkOrder) : new WorkOrderFormValues()}
                    onSubmit={(values, { resetForm }) => { handleFormSubmit(values); resetForm(); }}>
                    {({ handleSubmit, isValid, isSubmitting, dirty, resetForm, setFieldValue }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <Grid>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Work Order' color='teal' />
                                    <MyTextInput name='job' placeholder='Work Order' />
                                    <Header as='h4' content='Start Date' color='teal' />
                                    <MyDateInput name='startDate' placeholderText='Start Date' />
                                    <Header as='h4' content='Schedule To Release' color='teal' />
                                    <MyDateInput name='scheduleToRelease' placeholderText='Schedule to Release' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Released Date' color='teal' />
                                    <MyDateInput name='dateReleased' placeholderText='Released Date' />
                                    <Header as='h4' content='Assembly' color='teal' />
                                    <MyTextInput name='assembly' placeholder='Assembly' />
                                    <Header as='h4' content='Class' color='teal' />
                                    <MySelectInput name='class' placeholder='Class' options={ClassOptions} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Order Type' color='teal' />
                                    <MySelectInput name='type' placeholder='Order Type' options={OrderTypeOptions} />
                                    <Header as='h4' content='Completion Date' color='teal' />
                                    <MyDateInput name='completionDate' placeholderText='Completion Date' />
                                    <Header as='h4' content='Parent WO Number' color='teal' />
                                    <MyTextInput name='parentWONumber' placeholder='Parent WO Number' />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Work Order Quantity' color='teal' />
                                    <MyTextInput name='orderQuantity' type='number' placeholder='Work Order Quantity' />
                                    <Header as='h4' content='Product Line / Family' color='teal' />
                                    <MySelectInput name='prodLine' placeholder='Product Line / Family' options={ProdLineOptions} />
                                    <Header as='h4' content='Organization' color='teal' />
                                    <MySelectInput name='organization' placeholder='Organization' options={OrganizationOptions} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as='h4' content='Hot Order' color='teal' />
                                    <Checkbox name='hotOrder' slider checked={hotOrder} onChange={(e, { checked }) => { setHotOrder(checked!); setFieldValue('hotOrder', checked) }} />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Button.Group floated='right'>
                                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='Save' onClick={() => setStatus('Saved')} />
                                        <Button.Or />
                                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' primary type='submit' content='Release' onClick={() => setStatus('Released')} />
                                        <Button.Or />
                                        <Button floated='right' type='button' content='Cancel' onClick={() => { clearSelectedSavedWorkOrders(); setHotOrder(false); resetForm(); }} />
                                    </Button.Group>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Segment>
            <Segment>
                <SavedWorkOrdersTable />
            </Segment>
        </>
    )
})