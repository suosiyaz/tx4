import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Checkbox, Grid, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import { useEffect, useState } from 'react';
import MySelectInput from '../../app/common/form/MySelectInput';
import { TeamOptions } from '../../app/common/options/teamOptions';
import { OrganizationOptions } from '../../app/common/options/organizationOptions';
import { UserRoleOptions } from '../../app/common/options/userRoleOptions';
import { UserDetail } from '../../app/models/user';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const [isActive, setIsActive] = useState<boolean>(true);
    const { selectedUser, clearSelectedUser } = userStore;

    useEffect(() => {
        if (selectedUser) setIsActive(selectedUser.isActive);
    }, [selectedUser])

    return (
        <Formik
            initialValues={selectedUser ? selectedUser : new UserDetail()}
            enableReinitialize
            validateOnMount
            onSubmit={(values, { setErrors, setFieldError }) => selectedUser ? userStore.update(values).catch(error =>  setFieldError('userRole', error )) : userStore.register(values).catch(error => setErrors({ error }))}
            validationSchema={selectedUser ? Yup.object({
                userName: Yup.string().required(),
                team: Yup.string().required(),
                organisation: Yup.string().required(),
                userRole: Yup.string().required()
            }) :
                Yup.object({
                    firstName: Yup.string().required(),
                    lastName: Yup.string().required(),
                    userName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                    team: Yup.string().required(),
                    organisation: Yup.string().required(),
                    userRole: Yup.string().required()
                })
            }
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty, setFieldValue }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={4}>
                            <Header as='h4' content='First Name' color='teal' />
                            <MyTextInput disabled={selectedUser !== undefined} name='firstName' placeholder='First Name' />
                            <Header as='h4' content='Password' color='teal' />
                            <MyTextInput disabled={selectedUser !== undefined} name='password' placeholder='Password' type='password' />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h4' content='Last Name' color='teal' />
                            <MyTextInput disabled={selectedUser !== undefined} name='lastName' placeholder='Last Name' />
                            <Header as='h4' content='Team' color='teal' />
                            <MySelectInput name='team' placeholder='Team' options={TeamOptions} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h4' content='Username' color='teal' />
                            <MyTextInput disabled={selectedUser !== undefined} name='userName' placeholder='Username' />
                            <Header as='h4' content='Organization' color='teal' />
                            <MySelectInput name='organisation' placeholder='Organization' options={OrganizationOptions} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h4' content='Email' color='teal' />
                            <MyTextInput disabled={selectedUser !== undefined} name='email' placeholder='Email' />
                            <Header as='h4' content='Role' color='teal' />
                            <MySelectInput name='userRole' placeholder='Role' options={UserRoleOptions} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h4' content='Is Active' color='teal' />
                            <Checkbox slider checked={isActive} name='isActive' onChange={(e, { checked }) => {setIsActive(checked!); setFieldValue('isActive', checked)}} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ErrorMessage name='error' render={() => <ValidationErrors errors={errors.error} />} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button.Group floated='right'>
                                <Button disabled={isSubmitting} content='Cancel' type='button' fluid onClick={clearSelectedUser} />
                                <Button.Or />
                                <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})