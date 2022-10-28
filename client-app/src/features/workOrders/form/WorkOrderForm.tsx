import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { WorkOrderFormValues } from '../../../app/models/workOrder';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { ProdLineOptions } from '../../../app/common/options/prodLineOptions';
import { StatusOptions } from '../../../app/common/options/statusOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default observer(function WorkOrderForm() {
    const history = useHistory();
    const { workOrderStore } = useStore();
    const { createWorkOrder, updateWorkOrder, loadWorkOrder, loadingInitial } = workOrderStore;
    const { id } = useParams<{ id: string }>();
    const [workOrder, setWorkOrder] = useState<WorkOrderFormValues>(new WorkOrderFormValues());

    const validationSchema = Yup.object({
        completed: Yup.string().required('Completed Quantity is required'),
        quantity: Yup.string().required('Remaining Quantity is required'),
        prodLine: Yup.string().required('Order Processing Line is required'),
        status: Yup.string().required('Reconfiguration Status is required'),
        completionDate: Yup.string().required('Expected Completion Date is required').nullable(),
    })

    useEffect(() => {
        if (id) loadWorkOrder(id).then(workOrder => setWorkOrder(new WorkOrderFormValues(workOrder)));
    }, [id, loadWorkOrder])

    function handleFormSubmit(workOrder: WorkOrderFormValues) {
        if (!workOrder.id) {
            let newWorkOrder = {
                ...workOrder,
                id: uuid()
            };
            createWorkOrder(newWorkOrder).then(() => history.push(`/workOrders/${newWorkOrder.id}`));
        } else {
            updateWorkOrder(workOrder).then(() => history.push(`/workOrders/${workOrder.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading work order...' />

    return (
        <Segment clearing>
            <Header content='HOT ORDER' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={workOrder}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='completed' placeholder='Completed Quantity' />
                        <MyTextInput name='quantity' placeholder='Remaining Quantity' />
                        <Header content='Other Details' sub color='teal' />
                        <MySelectInput options={ProdLineOptions} placeholder='Order Processing Line' name='prodLine' />
                        <MySelectInput options={StatusOptions} placeholder='Reconfiguration Status' name='prodLine' />
                        <MyDateInput
                            placeholderText='Expected Completion Date'
                            name='completionDate'
                            dateFormat='MMMM d, yyyy'
                        />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/workOrders' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})