import { formatDistance } from 'date-fns';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Header, Segment, Button, Feed, Icon, Label } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import MyTextArea from '../../../app/common/form/MyTextArea';

export default observer(function WorkOrderHotNews() {
    const { hotNewsStore } = useStore();
    const [newsForm, setNewsForm] = useState({ id: 0, summary: '', workOrder: '' });

    useEffect(() => {
        hotNewsStore.createHubConnection();
    }, [hotNewsStore])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Hot News</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) => hotNewsStore.addNews(values).then(() => { setNewsForm({ id: 0, summary: '', workOrder: '' }); resetForm() })}
                    initialValues={newsForm}
                    enableReinitialize
                    validationSchema={Yup.object({
                        summary: Yup.string().required(),
                        workOrder: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit, resetForm, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='workOrder' placeholder='Work Order' />
                            <MyTextArea name='summary' placeholder='Enter your summary' rows={3} />
                            <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                            <Button floated='right' type='button' content='Cancel' onClick={() => { setNewsForm({ id: 0, summary: '', workOrder: '' }); resetForm() }} />
                        </Form>
                    )}
                </Formik>
                <Feed>
                    {hotNewsStore.news.map(hotNews => (
                        <Feed.Event key={hotNews.id}>
                            <Feed.Label image='/assets/user.png' />
                            <Feed.Content>
                                <Feed.Summary>
                                    <strong style={{ color: '#2185d0' }}>{hotNews.displayName}</strong> posted on work order <Label>{hotNews.workOrder}</Label>
                                    <Feed.Date>{formatDistance(new Date(hotNews.createdAt), new Date())} ago</Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra style={{maxWidth: '1000px !important'}} text>{hotNews.summary}</Feed.Extra>
                                <Feed.Meta>
                                    <Feed.Like onClick={() => setNewsForm({ id: hotNews.id, summary: hotNews.summary, workOrder: hotNews.workOrder })}>
                                        <Icon name='pencil' />Edit
                                    </Feed.Like>
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    ))}

                </Feed>
            </Segment>
        </>
    )
})