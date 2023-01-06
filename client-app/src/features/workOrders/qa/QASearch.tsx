import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { ClassOptions } from '../../../app/common/options/classOptions';
import { OrderTypeOptions } from '../../../app/common/options/orderTypeOptions';
import { StatusOptions } from '../../../app/common/options/statusOptions';
import { useStore } from '../../../app/stores/store';

export default observer(function QASearch() {
    const { reviewStore: { qaPredicate, setQAPredicate, resetQAParams, loadWorkOrdersForQA, clearQAWorkOrders } } = useStore();

    function handleFormSubmit(values: any) {
        setQAPredicate('workOrders', values.job);
        setQAPredicate('type', values.type);
        setQAPredicate('status', values.status);
        setQAPredicate('class', values.class);
        loadWorkOrdersForQA();
    }

    const formInitialValues = {
        job: qaPredicate.has('workOrders') ? qaPredicate.get('workOrders') : '',
        status: qaPredicate.has('status') ? qaPredicate.get('status') : '',
        type: qaPredicate.has('type') ? qaPredicate.get('type') : '',
        class: qaPredicate.has('class') ? qaPredicate.get('class') : ''
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
                            <Grid.Column width={7}>
                                <MyTextInput name='job' placeholder='Work Order (Search multiple work orders seperated by comma)' />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <MySelectInput name='status' placeholder='Work Order Status' options={StatusOptions} />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <MySelectInput name='type' placeholder='Order Type' options={OrderTypeOptions} />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <MySelectInput name='class' placeholder='Class' options={ClassOptions} />
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Button.Group floated='right'>
                                    <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} positive type='submit' content='Search' />
                                    <Button.Or />
                                    <Button type='button' content='Clear' onClick={() => { resetQAParams(); resetForm(); clearQAWorkOrders() }} />
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