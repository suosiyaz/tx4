import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { ClassOptions } from '../../../app/common/options/classOptions';
import { OrderTypeOptions } from '../../../app/common/options/orderTypeOptions';
import { StatusOptions } from '../../../app/common/options/statusOptions';
import { useStore } from '../../../app/stores/store';

export default observer(function WorkOrderSearch() {
    const { workOrderStore: { predicate, setPredicate, resetParams, loadWorkOrders } } = useStore();

    function handleFormSubmit(values: any) {
        setPredicate('workOrders', values.job);
        setPredicate('type', values.type);
        setPredicate('status', values.status);
        setPredicate('releaseDateFrom', values.releaseDateFrom);
        setPredicate('releaseDateTo', values.releaseDateTo);
        setPredicate('completionDateFrom', values.completionDateFrom);
        setPredicate('completionDateTo', values.completionDateTo);
        setPredicate('class', values.class);
        setPredicate('assembly', values.assembly);
        loadWorkOrders();
    }

    const formInitialValues = {
        job: predicate.has('workOrders') ? predicate.get('workOrders') : '',
        status: predicate.has('status') ? predicate.get('status') : '',
        type: predicate.has('type') ? predicate.get('type') : '',
        releaseDateFrom: predicate.has('releaseDateFrom') ? new Date(predicate.get('releaseDateFrom')) : null,
        releaseDateTo: predicate.has('releaseDateTo') ? new Date(predicate.get('releaseDateTo')) : '',
        completionDateFrom: predicate.has('completionDateFrom') ? new Date(predicate.get('completionDateFrom')) : null,
        completionDateTo: predicate.has('completionDateTo') ? new Date(predicate.get('completionDateTo')) : null,
        class: predicate.has('class') ? predicate.get('class') : '',
        assembly: predicate.has('assembly') ? predicate.get('assembly') : ''
    }

    return (
        <Segment clearing>
            <Formik
                onSubmit={(values, { resetForm }) => { handleFormSubmit(values); resetForm() }}
                initialValues={formInitialValues}
                enableReinitialize
            >
                {({ isSubmitting, isValid, handleSubmit, resetForm, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Grid>
                            <Grid.Column width={8}>
                                <MyTextInput name='job' placeholder='Work Order (Search multiple work orders seperated by comma)' />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MySelectInput name='status' placeholder='Work Order Status' options={StatusOptions} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MySelectInput name='type' placeholder='Order Type' options={OrderTypeOptions} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MyDateInput name='releaseDateFrom' placeholderText='Release Date From' />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MyDateInput name='releaseDateTo' placeholderText='Release Date To' />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MyDateInput name='completionDateFrom' placeholderText='Completion Date From' />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MyDateInput name='completionDateTo' placeholderText='Completion Date To' />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MySelectInput name='class' placeholder='Class' options={ClassOptions} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MyTextInput name='assembly' placeholder='Assembly' />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Button.Group floated='right'>
                                    <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} positive type='submit' content='Search' />
                                    <Button.Or />
                                    <Button type='button' content='Clear' onClick={() => { resetParams(); resetForm(); loadWorkOrders() }} />
                                </Button.Group>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Grid>
                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})