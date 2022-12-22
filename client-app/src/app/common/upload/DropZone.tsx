import { observer } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone'
import { Button, Header, Icon, List } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

interface Props {
    uploadFile: (file: File) => void;
}

export default observer(function Dropzone({ uploadFile }: Props) {
    const { workOrderStore } = useStore();
    const { uploading } = workOrderStore;

    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }

    const dzActive = {
        borderColor: 'green'
    }

    const { getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles } = useDropzone({
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        maxFiles: 1
    })

    return (
        <>
            <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
                <input {...getInputProps()} />
                <Icon name='upload' size='huge' />
                <Header content='Click to select file or Drop file here' />
            </div>
            <div>
                {fileRejections.map(({ file, errors }) => (
                    <List bulleted key={file.name}>
                        {errors.map(e => (
                            <List.Item style={{ color: 'red' }} key={e.code}>{e.message}</List.Item>
                        ))}
                    </List>
                ))}
            </div>
            <div>
                {acceptedFiles.map(file => (
                    <List bulleted key={file.name}>
                        <List.Item style={{ color: 'green' }}>{file.name} is loaded</List.Item>
                    </List>
                ))}
            </div>
            <Button.Group floated='right'>
                <Button as='a' href='/assets/DC OPS Excel Upload.xlsx' content='Download Template' primary style={{ marginTop: '10px', marginBottom: '10px' }} onClick={() => uploadFile(acceptedFiles[0])} />
                <Button loading={uploading} content='Upload' disabled={acceptedFiles.length !== 1 || fileRejections.length > 0} positive style={{ marginTop: '10px', marginBottom: '10px' }} onClick={() => uploadFile(acceptedFiles[0])} />
            </Button.Group>
        </>
    )
})